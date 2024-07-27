'use client';

import React from "react";
import { MainLayout } from "@/layout";
import AnimatedSidebar from "@/ui/annimation/AnimatedSidebar";

const DashboardPage: React.FC = () => {
    return (
        <MainLayout >
            <AnimatedSidebar duration={2500} startSize={1500} endSize={70} />
            <div>
                Your main content here
            </div>
        </MainLayout>
    );
};

export default DashboardPage;
