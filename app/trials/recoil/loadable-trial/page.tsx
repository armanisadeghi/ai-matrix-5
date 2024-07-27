'use client';

import { activeChatIdAtom, chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { RecoilRoot, useRecoilState, useRecoilValueLoadable } from 'recoil';
import GenericComponent from './Component5';


// works perfectly with components 1-4 which are not fully dynamic and need the atom names locally,
// but with this one that dynamically takes the names, it doesn't work yet.

function App() {
    const [activeChatId, setActiveChatId] = useRecoilState(activeChatIdAtom);
    const chatSummariesLoadable = useRecoilValueLoadable(chatSummariesAtom);


    return (
        <RecoilRoot>
            <GenericComponent
                activeItemIdAtom={activeChatIdAtom}
                itemSummariesSelector={chatSummariesAtom}
            />
        </RecoilRoot>
    );
}

export default App;
