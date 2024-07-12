// components/AmeSearchInputOptimized/AmeSearchInputStatic.tsx

import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';


interface AmeSearchInputStaticProps extends Partial<TextInputProps> {
    width?: number | string;
    height?: number | string;
    otherStyles?: React.CSSProperties;
}

const AmeSearchInputStatic: React.FC<AmeSearchInputStaticProps> = (
    {
        width = 450,
        height = 30,
        otherStyles,
        ...others
    }) => {
    const style = {
        width,
        height,
        ...otherStyles
    };

    return (
        <TextInput
            placeholder="search"
            radius="md"
            size="xs"
            leftSection={<IconSearch size={16}/>}
            style={style}
            {...others}
        />
    );
};

export default AmeSearchInputStatic;
