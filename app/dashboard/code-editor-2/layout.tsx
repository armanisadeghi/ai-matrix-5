"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface Props {
    children: ReactNode;
}

function Layout({ children }: Props) {
    return (
        <Provider store={store}>
            <div>{children}</div>
        </Provider>
    );
}

export default Layout;
