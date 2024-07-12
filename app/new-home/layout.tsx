import React, { ReactNode } from "react";
import { PublicLayout } from "@/layout/Public";

type Props = {
    children: ReactNode;
};

function Layout({ children }: Props) {
    return <PublicLayout>{children}</PublicLayout>;
}

export default Layout;
