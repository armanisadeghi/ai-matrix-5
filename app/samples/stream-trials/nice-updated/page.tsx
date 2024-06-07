// app/samples/stream-trials/page.tsx

import React, { Suspense } from 'react';
import Chat from './interface/chat';
import Loading from '@/app/dashboard/loading';

export default function Dashboard() {

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <Chat  />

            </Suspense>
        </section>
    );
}
