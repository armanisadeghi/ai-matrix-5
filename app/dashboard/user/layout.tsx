"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/context/SidebarContext";

type Props = {
    children: ReactNode;
};

export default function AccountsLayout({ children }: Props) {
    return <SidebarProvider>{children}</SidebarProvider>;
}
