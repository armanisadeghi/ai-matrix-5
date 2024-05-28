// chat-app/layout.tsx

import React, { ReactNode } from 'react';
import { ChatProvider } from './context/ChatContext';
import { UserProvider } from './context/UserContext';
import { FormProvider } from './context/FormContext';
import { GlobalChatProvider } from './context/GlobalChatContext';
import { RequestMetadataProvider } from './context/RequestMetadataContext';
import { SettingsProvider } from './context/SettingsContext';
import { HistoryProvider } from './context/HistoryContext';
import { AiResponseProvider } from './context/AiResponseContext';
import { ResponseProvider } from './components/response/ResponseContext'; // Duplicate to address later
import ChatLayout from './layout';

import ChatPage from './chatpage';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <UserProvider>
            <ChatProvider>
                <HistoryProvider>
                    <FormProvider>
                        <GlobalChatProvider>
                            <RequestMetadataProvider>
                                <SettingsProvider>
                                    <AiResponseProvider>
                                        <ResponseProvider>
                                            <div>
                                                <header>Chat App Layout (Layout)</header>
                                                <ChatPage/>
                                                <main>{children}</main>
                                            </div>
                                        </ResponseProvider>
                                    </AiResponseProvider>
                                </SettingsProvider>
                            </RequestMetadataProvider>
                        </GlobalChatProvider>
                    </FormProvider>
                </HistoryProvider>
            </ChatProvider>
        </UserProvider>
    );
};

export default Layout;
