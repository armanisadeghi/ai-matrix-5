// app/dashboard/layout-small-nav.tsx

import { ReactNode } from "react";
import { AppsLayout, MainLayout } from "@/layout";

type Props = {
    children: ReactNode;
};

function SmallSidebarLayout({ children }: Props) {
    return <MainLayout defaultNavCollapse={true}>{children}</MainLayout>;
}

export default SmallSidebarLayout;
