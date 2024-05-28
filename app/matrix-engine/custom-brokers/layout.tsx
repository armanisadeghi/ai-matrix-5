import { BrokerProvider } from "@/context/brokerContext";
import { MainLayout } from "@/layout"
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function BrokersLayout({ children }: Props): JSX.Element {
    return (
        <MainLayout><BrokerProvider>
            {children}
        </BrokerProvider></MainLayout>
    );
}