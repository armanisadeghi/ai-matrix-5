import { ReactNode } from "react";
import { MainLayout } from "@/layout";

type Props = {
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
    return <MainLayout defaultNavCollapse>{children}</MainLayout>;
}
