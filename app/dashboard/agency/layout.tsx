import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function AgencyLayout({ children }: Props) {
    return <div>{children}</div>;
}
