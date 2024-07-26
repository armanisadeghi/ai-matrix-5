import ChatCoreProvider from '@/app/trials/stream-encapsulated/components/ChatCoreComponent';
import React, { ReactNode } from 'react';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => (
    <ChatCoreProvider>
        {children}
    </ChatCoreProvider>
);

export default Layout;
