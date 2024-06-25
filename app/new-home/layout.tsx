import { MainLayout } from "@/layout";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return <MainLayout>{children}</MainLayout>;
}

export default Layout;
