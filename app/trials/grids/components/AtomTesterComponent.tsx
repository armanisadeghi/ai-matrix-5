// components/AtomTesterComponent.tsx
'use client';

import { chatSummariesAtom } from '@/state/aiAtoms/aiChatAtoms';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { useRecoilValue } from 'recoil';

const AtomTesterComponent: React.FC = () => {
    const chatSummary = useRecoilValue(chatSummariesAtom);
    return (
        <AmeJsonInput
            value={JSON.stringify(chatSummary || '', null, 2)}
            readOnly
            autosize
            label=''
        />
    );
};

export default AtomTesterComponent;
