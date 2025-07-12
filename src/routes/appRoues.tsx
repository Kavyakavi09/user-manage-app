import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Users from '../pages/Users';
import ProtectedRoute from './protectedRoute';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
]);
