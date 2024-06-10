'use client';

import React from 'react';
import { GuestLayout } from '@/layout';
import { GuestHero } from '@/components/GuestHero/GuestHero';

const HomePage = () => {
    const overrideUserId = 'a048d457-c058-481b-a9a1-7d821b6435d5';
    return (
            <GuestLayout>
                <GuestHero />
            </GuestLayout>
    );
};

export default HomePage;
