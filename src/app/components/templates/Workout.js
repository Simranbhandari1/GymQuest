// 'use client';
// import React from 'react';
// import { useRouter } from 'next/router';
// import { Box } from '@mui/material';
// import Home from '@/pages/Home';
// import ExerciseDetail from '@/pages/ExerciseDetail';

// // Manual routing logic to simulate your Routes
// const App = () => {
//   const router = useRouter();
//   const path = router.pathname;

//   let PageComponent = null;

//   if (path === '/') {
//     PageComponent = <Home />;
//   } else if (path.startsWith('/exercise/')) {
//     PageComponent = <ExerciseDetail />;
//   } else {
//     PageComponent = <div>404 - Page not found</div>;
//   }

//   return (
//     <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
//       {PageComponent}
//     </Box>
//   );
// };

// export default App;
