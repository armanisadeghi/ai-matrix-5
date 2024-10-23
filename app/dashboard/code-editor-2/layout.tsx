"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
    children: ReactNode;
}

function Layout({ children }: Props) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>{children}</div>
            </PersistGate>
        </Provider>
    );
}

export default Layout;
