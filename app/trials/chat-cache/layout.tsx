// app/trials/chat-cache/layout.tsx

import React, { ReactNode } from 'react';
import ChatList from './ChatList';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div style={{ display: 'flex' }}>
        <ChatList />
        <div style={{ flex: 1 }}>
            {children}
        </div>
    </div>
);

export default Layout;
