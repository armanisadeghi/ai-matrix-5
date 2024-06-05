// app/dashboard/page.tsx
import React, { Suspense } from 'react';
import OpenAiMessages from './components/OpenAiMessages';
import Loading from '@/app/dashboard/loading';

export default function Dashboard() {

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <OpenAiMessages  />

            </Suspense>
        </section>
    );
}
