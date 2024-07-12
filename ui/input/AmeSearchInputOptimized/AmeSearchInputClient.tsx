'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const AmeSearchInputInteractive = dynamic(() => import('./AmeSearchInputInteractive'), {
    ssr: false,
});

interface AmeSearchInputClientProps {
    children: (isInteractive: boolean) => React.ReactNode;
    fallback: React.ReactNode;
}

const AmeSearchInputClient: React.FC<AmeSearchInputClientProps> = ({ children, fallback }) => {
    const [isInteractive, setIsInteractive] = useState(false);

    const handleFocus = useCallback(() => {
        setIsInteractive(true);
    }, []);

    if (isInteractive) {
        return <AmeSearchInputInteractive onFocus={handleFocus} />;
    }

    return (
        <div onFocus={handleFocus}>
            {children(isInteractive)}
            {!isInteractive && fallback}
        </div>
    );
};

export default AmeSearchInputClient;
