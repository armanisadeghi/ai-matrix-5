'use client';

import React from 'react';
import { Select, TextInput, Stack } from '@mantine/core';
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox';
import AmeSlider from '@/ui/slider/AmeSlider';
import AmeResponsiveSlider from "@/ui/slider/AmeResponsiveSlider";
import { AtomName } from '@/state/aiAtoms/settingsAtoms';
import { useSettingsAtoms } from './useSettingsAtoms';

interface SettingsAtomsTesterProps {
    atomNames: AtomName[];
}

export const SettingsAtomsTester: React.FC<SettingsAtomsTesterProps> = ({ atomNames }) => {
    const settings = useSettingsAtoms(atomNames);

    return (
        <Stack>
            {settings.map((setting, index) => {
                switch (setting.componentType) {
                    case 'Checkbox':
                        return (
                            <AmeCheckbox
                                key={index}
                                label={setting.label}
                                checked={setting.value as boolean}
                                onChange={(e) => setting.setValue(e.currentTarget.checked)}
                            />
                        );

                    case 'Select':
                        return (
                            <Select
                                key={index}
                                label={setting.label}
                                data={setting.options as { value: string; label: string }[]}
                                value={setting.value as string}
                                onChange={(val) => setting.setValue(val || '')}
                            />
                        );

                    case 'Input':
                        return (
                            <TextInput
                                key={index}
                                label={setting.label}
                                value={setting.value as string}
                                onChange={(event) => setting.setValue(event.currentTarget.value)}
                            />
                        );

                    case 'Slider':
                        return (
                            <AmeSlider
                                key={index}
                                name={setting.label}
                                min={(setting.options as { min: number; max: number; step: number }).min}
                                max={(setting.options as { min: number; max: number; step: number }).max}
                                step={(setting.options as { min: number; max: number; step: number }).step}
                                value={setting.value as number}
                                onChange={(val: number) => setting.setValue(val)}
                            />
                        );

                    case 'SliderPreset':
                        return (
                            <AmeResponsiveSlider
                                key={index}
                                setting={setting}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </Stack>
    );
};
