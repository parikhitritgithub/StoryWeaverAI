import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layouts/root-layout';
import DashboardLayout from './layouts/dashboard-layout';

// Import the components
import IndexPage from './routes';
import DashboardPage from './routes/dashboard';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [{ path: '/dashboard', element: <DashboardPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
