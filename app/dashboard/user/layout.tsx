"use client";

import { ReactNode } from "react";
import { NavbarProvider } from "@/context/NavbarContext";

type Props = {
    children: ReactNode;
};

export default function AccountsLayout({ children }: Props) {
    return <NavbarProvider initialNavState="icons">{children}</NavbarProvider>;
}
