'use client';

import AmeJsonInput from '@/ui/json/AmeJsonInput';
import AmeGridLayoutAdjustable from '@/ui/layout/AmeDragGirdPlus/AmaGridUpgraded';
import React, { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { RecoilStateTester, StateItem } from './RecoilStateTester';
import AmeGridLayout from '@/ui/layout/AmeGridLayout/AmeGridLayout';
import { Select, Stack } from '@mantine/core';
import {
    activeChatIdAtom,
    activeChatMessagesArrayAtom, chatMessagesAtomFamily, chatMessagesSelector,
    chatSummariesAtom, isNewChatAtom,
    systemMessageAtom,
    userTextInputAtom
} from '@/state/aiAtoms/aiChatAtoms';
import { quickChatSettingsList } from '@/state/aiAtoms/settingsAtoms';
import { activeUserAtom } from '@/state/userAtoms';

const AtomTesterPage: React.FC = () => {
    const [layoutType, setLayoutType] = useState<'grid' | 'adjustable' | 'none'>('grid');
    const [isMounted, setIsMounted] = useState(false);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const { setActiveChat } = useActiveChat();
    const isNewChat= useRecoilValue(isNewChatAtom);
    const messages = useSetRecoilState(chatMessagesAtomFamily(activeChatId));
    const messagesString = JSON.stringify(messages, null, 2);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLayoutChange = (value: string | null) => {
        if (value === 'grid' || value === 'adjustable' || value === 'none') {
            setLayoutType(value);
        }
    };
//
    const items: StateItem[] = [
        { type: 'atom', name: 'activeChatIdAtom', atom: activeChatIdAtom, viewType: 'textinput' },
        { type: 'selector', name: 'chatMessagesSelector', selector: chatMessagesSelector, viewType: 'json' },
        { type: 'atomFamily', name: 'messagesAtomFamily', atom: messagesAtomFamily, viewType: 'json' },
        { type: 'selector', name: 'chatSummariesSelector', selector: chatSummariesSelector, viewType: 'json' },
        { type: 'atom', name: 'chatSummariesAtom', atom: chatSummariesAtom, viewType: 'json' },
        { type: 'atom', name: 'activeChatMessagesArrayAtom', atom: activeChatMessagesArrayAtom, viewType: 'textarea' },
        { type: 'atomFamily', name: 'liveChatsAtomFamily', atom: liveChatsAtomFamily, viewType: 'json' },
        { type: 'atom', name: 'systemMessageAtom', atom: systemMessageAtom, viewType: 'textarea' },
        { type: 'atom', name: 'userTextInputAtom', atom: userTextInputAtom, viewType: 'textinput' },
        { type: 'atom', name: 'activeUserAtom', atom: activeUserAtom, viewType: 'json' },
        { type: 'settings', name: 'quickChatSettingsList', atomNames: quickChatSettingsList, viewType: 'json' },
    ];

    const gridItems = items.map((item) => ({
        title: item.name,
        content: <RecoilStateTester items={[item]} />
    }));

    const gridLayoutProps = {
        items: gridItems,
        columns: 3,
        rowHeight: 500,
        containerWidth: "100%",
        widthUnits: 9,
        heightUnits: 1
    };

    const adjustableLayoutProps = {
        items: gridItems,
        cols: { lg: 2, md: 2, sm: 1, xs: 1 },
        breakpoints: { lg: 1200, md: 996, sm: 777, xs: 480 },
        rowHeight: 400,
        containerWidth: "100%",
        widthUnits: 1,
        heightUnits: 1,
        containerPadding: [10, 10] as [number, number],
        margin: [10, 10] as [number, number],
        isResizable: true,
        isDraggable: true,
        compactType: "vertical" as const
    };

    return (
        <>                <AmeJsonInput
            value={messagesString}
            readOnly
            autosize
            label="Items"
        />
            <Stack gap="md">
                <Select
                    label="Choose Layout"
                    value={layoutType}
                    onChange={handleLayoutChange}
                    data={[
                        { value: 'adjustable', label: 'Adjustable Grid Layout' },
                        { value: 'grid', label: 'Grid Layout' },
                        { value: 'none', label: 'No Layout' }
                    ]}
                />
                <div style={{ width: '100%', maxWidth: '1350px', margin: '0 auto' }}>
                    {layoutType === 'adjustable' && isMounted && <AmeGridLayoutAdjustable {...adjustableLayoutProps} />}
                    {layoutType === 'grid' && <AmeGridLayout {...gridLayoutProps} />}
                    {layoutType === 'none' && <RecoilStateTester items={items} />}
                </div>
            </Stack>
        </>

    );
};

export default AtomTesterPage;
