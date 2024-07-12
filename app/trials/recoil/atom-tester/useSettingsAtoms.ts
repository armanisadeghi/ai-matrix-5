'use client';

import { useRecoilState, RecoilState } from 'recoil';
import { settingsAtoms, AtomName } from '@/state/aiAtoms/settingsAtoms';

type SettingValue = boolean | number | string;

export const useSettingsAtoms = (atomNames: AtomName[]) => {
    const settings = atomNames.map(name => {
        const setting = settingsAtoms[name];
        const [value, setValue] = useRecoilState(setting.atom as RecoilState<SettingValue>);
        return {
            ...setting,
            value,
            setValue: (newValue: SettingValue) => setValue(newValue),
        };
    });

    return settings;
};
