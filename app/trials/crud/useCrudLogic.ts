// app/trials/crud/useCrudLogic.ts
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatSummariesSelector, systemMessageAtom } from '@/state/aiAtoms/aiChatAtoms';

type ItemType = Record<string, any>;

const useCrudLogic = () => {
    const [systemMessage, setSystemMessage] = useRecoilState<string>(systemMessageAtom);
    const primaryItems = useRecoilValue<ItemType[]>(chatSummariesSelector);
    const idKey: string = 'chatId';
    const nameKey: string = 'chatTitle';

    useEffect(() => {
        setSystemMessage('You are the best assistant ever!');
    }, [setSystemMessage]);

    return {
        primaryItems,
        idKey,
        nameKey,
    };
};

export default useCrudLogic;
