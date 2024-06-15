import React, { useState, useEffect, useRef } from 'react';
import { Slider, Box } from '@mantine/core';
import { useRecoilState, RecoilState } from 'recoil';
import { matrixLevelSetting } from '@/state/aiAtoms/settingsAtoms';

type SliderPresetSettingAtom = typeof matrixLevelSetting;

interface Mark {
    value: number;
    label: string;
}

interface AmeResponsiveSliderProps {
    setting?: SliderPresetSettingAtom;
    customAtom?: RecoilState<number>;
    customMarks?: Mark[];
}

const AmeResponsiveSlider: React.FC<AmeResponsiveSliderProps> = ({ setting = matrixLevelSetting, customAtom, customMarks }) => {
    const [value, setValue] = useRecoilState(customAtom || setting.atom);
    const marks = customMarks || setting.options;
    const [showLimitedMarks, setShowLimitedMarks] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentRect.width < 400) {
                    setShowLimitedMarks(true);
                } else {
                    setShowLimitedMarks(false);
                }
            }
        });

        if (sliderRef.current) {
            resizeObserver.observe(sliderRef.current);
        }

        return () => {
            if (sliderRef.current) {
                resizeObserver.unobserve(sliderRef.current);
            }
        };
    }, []);

    const getDynamicMarks = () => {
        if (showLimitedMarks) {
            return marks.map(mark => ({
                ...mark,
                label: mark.value === value ? mark.label : '',
            }));
        }
        return marks;
    };

    const min = Math.min(...marks.map(mark => mark.value));
    const max = Math.max(...marks.map(mark => mark.value));

    const sliderProps = {
        color: 'gray',
        min: min,
        max: max,
        value: value,
        onChange: setValue,
        marks: getDynamicMarks(),
        size: 'sm',
    };

    return (
        <Box ref={sliderRef} px="xl" py="md">
            <Slider {...sliderProps} />
        </Box>
    );
};

export default AmeResponsiveSlider;
