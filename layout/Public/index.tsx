import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function PublicLayout({ children }: Props) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
