import { BrokerProvider } from "@/context/brokerContext";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function BrokersLayout({ children }: Props): JSX.Element {
    return (
        <BrokerProvider>
            {children}
        </BrokerProvider>
    );
}