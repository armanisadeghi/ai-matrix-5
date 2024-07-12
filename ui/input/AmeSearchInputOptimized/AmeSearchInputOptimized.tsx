// components/AmeSearchInputOptimized/AmeSearchInputOptimized.tsx

import React from 'react';
import { TextInputProps } from '@mantine/core';
import AmeSearchInputStatic from './AmeSearchInputStatic';
import AmeSearchInputClient from './AmeSearchInputClient';

interface AmeSearchInputProps extends Partial<TextInputProps> {
    width?: number | string;
    height?: number | string;
    otherStyles?: React.CSSProperties;
}

const AmeSearchInputOptimized: React.FC<AmeSearchInputProps> = (props) => {
    return (
        <AmeSearchInputClient fallback={<AmeSearchInputStatic {...props} />}>
            {(isInteractive) =>
                isInteractive ? <AmeSearchInputStatic {...props} /> : null
            }
        </AmeSearchInputClient>
    );
};

export default AmeSearchInputOptimized;
