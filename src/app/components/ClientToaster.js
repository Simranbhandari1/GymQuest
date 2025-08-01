'use client';
import { Toaster } from 'react-hot-toast';

export default function ClientToaster() {
  return <Toaster containerClassName='mt-20' position="top-right" reverseOrder={false} />;
}