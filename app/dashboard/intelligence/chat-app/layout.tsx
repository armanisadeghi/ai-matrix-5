import React, { ReactNode } from 'react';
import { ChatProvider } from './context/ChatContext';
import { UserProvider } from './context/UserContext';
import { FormProvider } from './context/FormContext';
import { GlobalChatProvider } from './context/GlobalChatContext';
import { RequestMetadataProvider } from './context/RequestMetadataContext';
import { SettingsProvider } from './context/SettingsContext';
import { HistoryProvider } from './context/HistoryContext';
import { AiResponseProvider } from './context/AiResponseContext';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <UserProvider>
            <ChatProvider>
                <HistoryProvider>
                    <FormProvider>
                        <GlobalChatProvider>
                            <RequestMetadataProvider>
                                <SettingsProvider>
                                    <AiResponseProvider>
                                        <div>
                                            <header>Chat App Layout (Layout)</header>
                                            <main>{children}</main>
                                        </div>
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
