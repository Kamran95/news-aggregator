import React from 'react';

// Lazy-loaded components
const GuardianNews = React.lazy(() => import('../pages/GuardianNews/GuardianNews'));
const NYTNews = React.lazy(() => import('../pages/NYTNews/NYTNews'));
const TheNews = React.lazy(() => import('../pages/TheNews/TheNews'));
import Home from '../pages/Home/Home';

export const routeConfig = [
    {
        path: '/',
        element: <Home />,
        exact: true,
    },
    {
        path: '/guardian-news',
        element: <GuardianNews />,
        exact: true,
    },
    {
        path: '/nyt-news',
        element: <NYTNews />,
    },
    {
        path: '/the-news',
        element: <TheNews />,
    },
];
