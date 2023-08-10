import { Navigate, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import PageTemplate from './layouts/page-template/PageTemplate';
import Events from './pages/Events/Events';
import Participants from './pages/Participants/Participants';
import Admin from './pages/Admin/Admin';
import SingleEvent from './pages/Event/SingleEvent';
import EventsManagement from './pages/EventsManagement/EventsManagement';
import React from 'react';
import Records from './pages/Records/Records';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <PrivateRoutes />,
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
                path: '/records',
                element: <Records />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '/event-page/:id',
                element: <SingleEvent />,
            },
            {
                path: '/events/configuration',
                element: <EventsManagement />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
        ],
    },
]);
