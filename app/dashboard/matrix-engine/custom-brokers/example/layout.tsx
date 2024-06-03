import { LayoutProvider } from "@/context/LayoutContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { BrokerProvider } from "@/context/brokerContext";
import { MainLayout } from "@/layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function ExampleLayout({ children }: Props): JSX.Element {
    return (
        <LayoutProvider initialNavbarState="icons"><SidebarProvider>
            <MainLayout><BrokerProvider>
                {children}
            </BrokerProvider></MainLayout></SidebarProvider></LayoutProvider>
    );
}