// app/dashboard/page.tsx
import React, { Suspense } from 'react';
import OpenAiMessages from './components/FullChat';
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
