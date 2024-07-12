import { activeChatWithMessagesSelector } from '@/state/aiAtoms/aiChatAtoms';
import { Suspense } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <ErrorBoundary fallback={<div>Error loading chat</div>}>
            <Suspense fallback={<div>Loading...</div>}>
                <ChatComponent />
            </Suspense>
        </ErrorBoundary>
    );
}

function ChatComponent() {
    const ChatsAndMessagesLoadable = useRecoilValueLoadable(activeChatWithMessagesSelector);

    switch (ChatsAndMessagesLoadable.state) {
        case 'hasValue':
            return <div>{/* Render chat */}</div>;
        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            return <div>Error: {ChatsAndMessagesLoadable.contents.message}</div>;
    }
}
