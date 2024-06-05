// chat-app/hooks/useHistory.ts

import { useContext } from 'react';
import { HistoryContext } from '@/context/AiContext/HistoryContext';

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
