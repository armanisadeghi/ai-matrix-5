// components/AmeSearchInput/AmeSearchInput.tsx

import React from 'react';
import { TextInputProps } from '@mantine/core';
import AmeSearchInputClient from './AmeSearchInputClient';

interface AmeSearchInputProps extends Partial<TextInputProps> {
    width?: number | string;
    height?: number | string;
    otherStyles?: React.CSSProperties;
}

const AmeSearchInput: React.FC<AmeSearchInputProps> = (props) => {
    return <AmeSearchInputClient {...props} />;
};

export default AmeSearchInput;
