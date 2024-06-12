'use client';

import { ReactNode } from "react";
import { MainLayout } from "@/layout";
import { NavbarProvider } from "@/context/NavbarContext";

type Props = {
    children: ReactNode;
};

export default function AgencyLayout({children}: Props) {

    return
    <NavbarProvider>
        <MainLayout>
            {children}
        </MainLayout>
    </NavbarProvider>
}
