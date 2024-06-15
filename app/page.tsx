'use client';

import React from 'react';
import { GuestLayout } from '@/layout';
import { GuestHero } from '@/components/GuestHero/GuestHero';

const HomePage = () => {
    return (
            <GuestLayout>
                <GuestHero />
            </GuestLayout>
    );
};

export default HomePage;
