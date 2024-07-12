// matrix-apps/OptionalStarterPage.tsx

"use client";

import React from "react";

const MatrixAppsPage = () => {
  console.log("MatrixAppsPage is rendering");
  return <div>Matrix Apps Home Page</div>;
};

export default MatrixAppsPage;

/*
import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from './error';
import LoadingPage from './loading';
import NotFoundPage from './not-found';
import BuildPage from './build/page';
import RunPage from './run/page';
import RightDrawer from './right-drawer';

const MatrixAppsPage = () => {
    const router = useRouter();
    const { query } = router;

    // Dummy loading state, replace with your actual loading logic
    const loading = false; // You should define this based on actual conditions

    if (loading) {
        return <LoadingPage />;
    }

    switch (query.page) {
        case 'build':
            return <BuildPage />;
        case 'run':
            return <RunPage />;
        // Add more cases as needed for other sub-pages
        default:
            return <NotFoundPage />;
    }
};

export default MatrixAppsPage;
*/
