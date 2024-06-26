// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundary";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function Layout({children}: Props) {
    return (
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    );
}

export default Layout;
