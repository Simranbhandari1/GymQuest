import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/config/db';
import User from '@/lib/models/userModel';

export async function POST(request) {
  try {
    const { credential: token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'No credential token provided' }, { status: 400 });
    }

    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const decoded = ticket.getPayload();
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 });
    }

    await connectDB();

    // Check for existing user or create a new one
    let user = await User.findOne({ email: decoded.email });

    if (!user) {
      user = new User({
        email: decoded.email,
        name: decoded.name,
        username: decoded.email.split('@')[0],
        image: decoded.picture,
        loginMethod: 'google',
        refreshTokens: [],
        role: decoded.email === 'admin@example.com' ? 'admin' : 'user', // optional
      });
      await user.save();
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    user.refreshTokens = user.refreshTokens || [];
    user.refreshTokens.push(refreshToken);
    await user.save();

    // Send tokens as HTTP-only cookies
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        username: user.username,
        role: user.role,
      },
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15,
      path: '/',
      sameSite: 'strict',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
