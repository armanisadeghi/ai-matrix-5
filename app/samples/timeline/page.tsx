// app/samples/timeline/page.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import TimelineSample from "@/app/samples/timeline/Timeline";

const Page = () => {
    const {setSidebarContent} = useSidebar();

    React.useEffect(() => {
        setSidebarContent(
            <TimelineSample/>
        );

        return () => {
            setSidebarContent(null);
        };
    });

    return (<div>This is the Timeline Sample Page</div>
    );
};

export default Page;
