import React, { useState } from 'react';
import { Box, Slider, SegmentedControl, Stack } from '@mantine/core';


interface ImageComparisonProps {
    beforeSrc: string;
    afterSrc: string;
    beforeAlt?: string;
    afterAlt?: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
                                                             beforeSrc,
                                                             afterSrc,
                                                             beforeAlt = 'Before',
                                                             afterAlt = 'After',
                                                         }) => {
    const [comparisonValue, setComparisonValue] = useState(50);
    const [comparisonMode, setComparisonMode] = useState('slider');

    return (
        <Stack gap="md">
            <SegmentedControl
                value={comparisonMode}
                onChange={setComparisonMode}
                data={[
                    {label: 'Slider', value: 'slider'},
                    {label: 'Side by Side', value: 'sideBySide'},
                ]}
            />

            {comparisonMode === 'slider' ? (
                <Box style={{position: 'relative', overflow: 'hidden'}}>
                    <img
                        src={beforeSrc}
                        alt={beforeAlt}
                        style={{display: 'block', width: '100%'}}
                    />
                    <Box
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: `${100 - comparisonValue}%`,
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={afterSrc}
                            alt={afterAlt}
                            style={{
                                display: 'block',
                                width: `${10000 / (100 - comparisonValue)}%`,
                                position: 'absolute',
                                right: 0,
                            }}
                        />
                    </Box>
                    <Box
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: `${comparisonValue}%`,
                            width: 2,
                            backgroundColor: 'white',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                            cursor: 'ew-resize',
                        }}
                    />
                    <Slider
                        value={comparisonValue}
                        onChange={setComparisonValue}
                        min={0}
                        max={100}
                        step={0.1}
                        styles={{
                            root: {position: 'absolute', bottom: 20, left: '5%', right: '5%', width: '90%'},
                            track: {backgroundColor: 'rgba(255, 255, 255, 0.4)'},
                            thumb: {backgroundColor: 'white', borderColor: 'rgba(0, 0, 0, 0.5)'},
                        }}
                    />
                </Box>
            ) : (
                <Box style={{display: 'flex'}}>
                    <img
                        src={beforeSrc}
                        alt={beforeAlt}
                        style={{width: '50%', objectFit: 'cover'}}
                    />
                    <img
                        src={afterSrc}
                        alt={afterAlt}
                        style={{width: '50%', objectFit: 'cover'}}
                    />
                </Box>
            )}
        </Stack>
    );
};

export default ImageComparison;
