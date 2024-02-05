import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from './provider/AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignupPage from './pages/SignupPage';
import SportPage from './pages/SportPage';
import SportExercisesPage from './pages/SportExercisesPage';
import NewSessionPage from './pages/NewSessionPage';
import CurrentSessionPage from './pages/CurrentSessionPage';
import MySessionsPage from './pages/MySessionsPage';

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: '/service',
      element: <div>Service Page</div>,
    },
    {
      path: '/about-us',
      element: <div>About Us</div>,
    },
    {
      path: '/sport',
      element: <SportPage />,
    },
    {
      path: '/sport/:id',
      element: <SportExercisesPage />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/newSession',
          element: <NewSessionPage />,
        },
        {
          path: '/mySessions',
          element: <MySessionsPage />,
        },
        {
          path: '/currentSession',
          element: <CurrentSessionPage />,
        },
        {
          path: '/logout',
          element: <LogoutPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
