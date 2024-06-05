import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function AccountsLayout({ children }: Props) {
    return <div>{children}</div>;
}
