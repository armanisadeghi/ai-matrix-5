// app/samples/sample-chat-one/page.tsx
'use client';

import PageLayout from './modular-center';
import React from 'react';
import ResponseArea from "@/components/AiChat/Response/ResponseArea";
import useDynamicLayout from "@/hooks/ai/useDynamicChatLayout";
import BottomSection from "./BottomSection";

export default function SamplePageWithCenterContent() {
    const { bottomPadding } = useDynamicLayout();

    return (
        <>
            <PageLayout
                bottomSectionContent={<BottomSection />}
            >
                <div>
                    <ResponseArea bottomPadding={bottomPadding} />
                </div>
            </PageLayout>
        </>
    );
}
