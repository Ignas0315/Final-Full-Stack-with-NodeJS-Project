import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageTemplate from './layouts/page-template/PageTemplate';
import Events from './pages/Events/Events';
import Participants from './pages/Participants/Participants';
import Admin from './pages/Admin/Admin';

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <PageTemplate />,
        children: [
            {
                path: '/',
                element: <Navigate to='/home' replace />,
            },

            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/events',
                element: <Events />,
            },
            {
                path: '/participants',
                element: <Participants />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
        ],
    },
]);
