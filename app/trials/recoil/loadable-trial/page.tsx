'use client';

import React from 'react';
import { RecoilRoot, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { activeChatIdAtom } from '@/state/aiAtoms/old/chatAtoms';
import { chatSummariesSelector } from '@/app/trials/core-chat-trial/hooks/old/useChatAtomsDb';
import GenericComponent from './Component5';


// works perfectly with components 1-4 which are not fully dynamic and need the atom names locally,
// but with this one that dynamically takes the names, it doesn't work yet.

function App() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesSelector);


    return (
        <RecoilRoot>
            <GenericComponent
                activeItemIdAtom={activeChatIdAtom}
                itemSummariesSelector={chatSummariesSelector}
            />
        </RecoilRoot>
    );
}

export default App;
