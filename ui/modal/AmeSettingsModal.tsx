import React from 'react';
import { useRecoilState } from 'recoil';
import { Modal, Select, TextInput, ScrollArea } from '@mantine/core';
import AmeFieldset from '@/ui/fieldset/AmeFieldset';
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox';
import AmeSlider from '@/ui/slider/AmeSlider';
import { settingsAtoms, AtomName } from '@/state/aiAtoms/settingsAtoms';
import AmeResponsiveSlider from "@/ui/slider/AmeResponsiveSlider";

interface AmeSettingsModalProps {
    opened: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    atomNames: AtomName[];
}

const AmeSettingsModal: React.FC<AmeSettingsModalProps> = ({ opened, onClose = () => {}, onSubmit, atomNames }) => {
    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit();
        }
        onClose();
    };

    const renderSetting = (atomName: AtomName) => {
        const settingAtom = settingsAtoms[atomName];

        if (settingAtom.componentType === 'Checkbox') {
            const [boolValue, setBoolValue] = useRecoilState(settingAtom.atom);
            return (
                <AmeCheckbox
                    label={settingAtom.label}
                    checked={boolValue}
                    onChange={(e) => setBoolValue(e.currentTarget.checked)}
                />
            );
        }

        if (settingAtom.componentType === 'Select') {
            const [stringValue, setStringValue] = useRecoilState(settingAtom.atom);
            return (
                <Select
                    label={settingAtom.label}
                    data={settingAtom.options as { value: string; label: string }[]}
                    value={stringValue}
                    onChange={(val) => setStringValue(val || '')}
                />
            );
        }

        if (settingAtom.componentType === 'Input') {
            const [stringValue, setStringValue] = useRecoilState(settingAtom.atom);
            return (
                <TextInput
                    label={settingAtom.label}
                    value={stringValue}
                    onChange={(event) => setStringValue(event.currentTarget.value)}
                />
            );
        }

        if (settingAtom.componentType === 'Slider') {
            const [numberValue, setNumberValue] = useRecoilState(settingAtom.atom);
            const sliderOptions = settingAtom.options as { min: number; max: number; step: number };
            return (
                <AmeSlider
                    name={settingAtom.label}
                    min={sliderOptions.min}
                    max={sliderOptions.max}
                    step={sliderOptions.step}
                    value={numberValue}
                    onChange={(val: number) => setNumberValue(val)}
                />
            );
        }

        if (settingAtom.componentType === 'SliderPreset') {
            return (
                <AmeResponsiveSlider
                    setting={settingAtom}
                />
            );
        }

        return null;
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose} // Ensure this is passed correctly
            title="Customize your experience"
            centered
            size="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            scrollAreaComponent={ScrollArea.Autosize}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <AmeFieldset
                legend="Chat Settings"
                layout="single"
                fieldsetWidth="100%"
                showButton={true}
                onButtonClick={handleSubmit}
            >
                {atomNames.map((atomName, index) => (
                    <div key={index}>
                        {renderSetting(atomName)}
                    </div>
                ))}
            </AmeFieldset>
        </Modal>
    );
};

export default AmeSettingsModal;
