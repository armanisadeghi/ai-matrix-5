// app/samples/stream-trials/page.tsx

import React, { Suspense } from 'react';
import ChatInterface from './FullChat';
import Loading from '@/app/dashboard/loading';

export default function Dashboard() {

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <ChatInterface  />

            </Suspense>
        </section>
    );
}
