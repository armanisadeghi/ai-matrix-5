import React from 'react';
import dynamic from 'next/dynamic';
import AmeMultiSelectServer, { AmeMultiSelectProps } from './AmeMultiSelectServer';

const AmeMultiSelectClient = dynamic(() => import('./AmeMultiSelectClient'), { ssr: false });

const AmeMultiSelect: React.FC<AmeMultiSelectProps> = (props) => {
    if (typeof window === 'undefined') {
        return <AmeMultiSelectServer {...props} />;
    }
    return <AmeMultiSelectClient {...props} />;
};

export default AmeMultiSelect;
