// app/trials/crud/useCrudLogic.ts
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

type ItemType = Record<string, any>;

const useCrudLogic = () => {

    const idKey: string = 'chatId';
    const nameKey: string = 'chatTitle';

    useEffect(() => {
        console.log('You are the best assistant ever!');
    }, []);

    return {
        idKey,
        nameKey,
    };
};

export default useCrudLogic;
