// utils/colorUtils.ts

import { useMantineTheme, useMantineColorScheme } from '@mantine/core';

const useColorUtils = () => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const getDefaultBackgroundColor = () => {
        return colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[0] || theme.white;
    };

    const getHoverBackgroundColor = () => {
        return colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2] || theme.colors.gray[1];
    };

    const getContrastTextColor = () => {
        return colorScheme === 'dark'
            ? theme.colors.gray[0]
            : theme.colors.dark[7];
    };

    const getModerateTextColor = () => {
        return colorScheme === 'dark'
            ? theme.colors.gray[5]
            : theme.colors.gray[6];
    };

    return {
        getDefaultBackgroundColor,
        getHoverBackgroundColor,
        getContrastTextColor,
        getModerateTextColor,
    };
};

export default useColorUtils;
