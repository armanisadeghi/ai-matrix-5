// app/samples/layout.tsx
'use client'

import React, { useEffect } from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { MainLayout } from '@/layout';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { activeUserAtom, activeUserSelector } from "@/context/atoms/userAtoms";
import { DynamicSocketProvider } from "@/context/AiContext/socketContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { FooterProvider } from "@/context/FooterContext";
import ErrorBoundary from "@/components/ErrorManagement/ErrorBoundry";
import { PresetType } from "@/context/atoms/layoutAtoms";
import { NavbarProvider } from "@/context/NavbarContext";
import Loading from "@/app/dashboard/loading";

type Props = {
    children: ReactNode;
    preset: PresetType;
};

const LayoutContent: React.FC = () => {
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom);
    const activeUserLoadable = useRecoilValueLoadable(activeUserSelector);

    useEffect(() => {
        if (activeUserLoadable.state === 'hasValue') {
            const user = activeUserLoadable.contents;

            if (user) {
                setActiveUser(user);
                console.log('/samples/layout.tsx After setActiveUser - Active user atom:', user);
            }
        }
    }, [activeUserLoadable, setActiveUser]);

    if (!activeUser) {
        return <Loading/>;
    }
    return <div>Active user loaded</div>;
};

function Layout({
                    children,
                    preset
                }: Props) {
    return (
        <section>
            {children}
        </section>

    );
}

export default Layout;
