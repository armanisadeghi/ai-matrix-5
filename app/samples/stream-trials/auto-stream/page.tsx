// app/samples/stream-trials/page.tsx
'use client';

import React, { Suspense } from 'react';
import Loading from '@/app/dashboard/loading';
import AtomsJsonViewer from "@/ui/json/AmeAtomTester";
import {
    activeChatMessagesArrayAtom,
    assistantMessageEntryAtom,
    assistantTextStreamAtom,
    userTextInputAtom
} from "@/app/samples/ai-tests/shared/atoms/chatAtoms";
import { Grid } from '@mantine/core';
import AutoStreamPage from "@/app/samples/stream-trials/auto-stream/ChatComponents";

export default function Dashboard() {
    return (
        <section>
            <Suspense fallback={<Loading />}>
                <>
                    <Grid>
                        <Grid.Col span={7}>
                            <AutoStreamPage key="chatInterface" />,

                        </Grid.Col>
                        <Grid.Col span={2}>
                        </Grid.Col>

                        <Grid.Col span={3}>
                            <AtomsJsonViewer
                                key="atomsJsonViewer"
                                atomsInfo={[
                                    { atom: userTextInputAtom, name: 'User Text Input' },
                                    { atom: activeChatMessagesArrayAtom, name: 'Active Chat Messages Array' },
                                    { atom: assistantMessageEntryAtom, name: 'Assistant Message Entry' },
                                    { atom: assistantTextStreamAtom, name: 'Assistant Text Stream' },
                                ]}
                            />
                        </Grid.Col>
                    </Grid>

                </>
            </Suspense>
        </section>
    );
}
