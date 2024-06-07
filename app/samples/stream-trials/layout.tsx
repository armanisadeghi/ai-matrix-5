// app/dashboard/layout.tsx
"use client";

import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { MainLayout } from "@/layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function StreamSampleLayout({ children }: Props) {
    return (
        <ErrorBoundary>
            <MainLayout>{children}</MainLayout>
        </ErrorBoundary>
    );
}

export default StreamSampleLayout;
