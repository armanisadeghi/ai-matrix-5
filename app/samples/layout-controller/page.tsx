/*
'use client';

import React from 'react';
import AmeResponsiveSlider from '@/ui/slider/AmeResponsiveSlider';
import { Box, Title } from '@mantine/core';
import { sidebarWidthMap, footerHeightMap, headerHeightMap } from '@/state/layoutAtoms';
import { generateMarks } from '@/utils/generateMarks';
import { rightSidebarAtom, leftSidebarAtom, footerAtom, headerAtom } from '@/state/layoutAtoms';

const ResponsiveLayoutComponent: React.FC = () => {

    const handleSliderChange = (element: 'rightSidebar' | 'leftSidebar' | 'footer' | 'header', value: number) => {
        const layoutState = [...sidebarWidthMap.entries()].find(([key, val]) => val === value)?.[0] || 'custom';
        setLayout(element, layoutState);
    };

    return (
        <Box px="xl" py="md">
            <Title order={3}>Responsive Layout Settings</Title>
            <Box py="md">
                <AmeResponsiveSlider
                    setting={rightSidebarAtom}
                    customMarks={generateMarks(sidebarWidthMap)}
                    onChangeCallback={(value) => handleSliderChange('rightSidebar', value)}
                />
            </Box>
            <Box py="md">
                <AmeResponsiveSlider
                    setting={leftSidebarAtom}
                    customMarks={generateMarks(sidebarWidthMap)}
                    onChangeCallback={(value) => handleSliderChange('leftSidebar', value)}
                />
            </Box>
            <Box py="md">
                <AmeResponsiveSlider
                    setting={footerAtom}
                    customMarks={generateMarks(footerHeightMap)}
                    onChangeCallback={(value) => handleSliderChange('footer', value)}
                />
            </Box>
            <Box py="md">
                <AmeResponsiveSlider
                    setting={headerAtom}
                    customMarks={generateMarks(headerHeightMap)}
                    onChangeCallback={(value) => handleSliderChange('header', value)}
                />
            </Box>
        </Box>
    );
};

export default ResponsiveLayoutComponent;
*/
