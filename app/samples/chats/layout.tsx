// app/samples/chats/layout.tsx

'use client';

import React, { ReactNode } from 'react';
import ChatList from '../ChatComponents/ChatList';
import { useRecoilValue } from 'recoil';
import { activeUserAtom } from '@/context/atoms/userAtoms';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const activeUser = useRecoilValue(activeUserAtom);

    return (
        <div>
            {activeUser ? <ChatList user_id={activeUser.id} /> : <p>Loading...</p>}
            <main>{children}</main>
        </div>
    );
};

export default Layout;
