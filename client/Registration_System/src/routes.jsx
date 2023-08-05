import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home/admins',
                element: <Login />,
            },
        ],
    },
]);
