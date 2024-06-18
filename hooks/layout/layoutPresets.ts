// hooks/layout/layoutPresets.ts
import { useMemo } from 'react';
import { LayoutPreset, ModulePreset, PagePreset, PresetType, PresetValue } from "@/types/layout";

const moduleToLayoutType: Record<ModulePreset, LayoutPreset> = {
    dashboard: 'standard',
    intelligence: 'focusRight',
    samples: 'noSidebars',
    public: 'onlyHeader',
    matrixApps: 'minimalNav',
};

const pageToLayoutType: Record<PagePreset, LayoutPreset> = {
    chat: 'focusRight',
    settings: 'standard',
    profile: 'standard',
    notifications: 'standard',
    help: 'standard',
    about: 'standard',
    register: 'standard',
    notFound: 'standard',
    error: 'standard',
};

const presets: Record<LayoutPreset, { header: PresetValue, leftSidebar: PresetValue, rightSidebar: PresetValue, footer: PresetValue, toggles?: { header: boolean, leftSidebar: boolean, rightSidebar: boolean, footer: boolean } }> = {
    standard: {
        // [Desktop, Tablet, Mobile]
        header: [60, 60, 60],
        leftSidebar: [210, 200, 0],
        rightSidebar: [0, 0, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: false, footer: false },
    },
    focusLeft: {
        header: [60, 60, 60],
        leftSidebar: [300, 200, 0],
        rightSidebar: [200, 100, 0],
        footer: [100, 50, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: true },
    },
    focusRight: {
        header: [60, 60, 60],
        leftSidebar: [70, 200, 0],
        rightSidebar: [300, 100, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: true },
    },
    minimalNav: {
        header: [60, 60, 60],
        leftSidebar: [70, 70, 70],
        rightSidebar: [0, 0, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: false, footer: false },
    },
    noSidebars: {
        header: [60, 60, 60],
        leftSidebar: [0, 0, 0],
        rightSidebar: [0, 0, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: false, rightSidebar: false, footer: false },
    },
    iconsFullAside: {
        header: [60, 60, 0],
        leftSidebar: [70, 70, 0],
        rightSidebar: [250, 200, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: false },
    },
    iconsNoAside: {
        header: [60, 60, 0],
        leftSidebar: [70, 70, 0],
        rightSidebar: [0, 0, 0],
        footer: [0, 0, 0],
        toggles: { header: false, leftSidebar: true, rightSidebar: false, footer: false },
    },
    iconsCompactAside: {
        header: [60, 60, 60],
        leftSidebar: [70, 70, 70],
        rightSidebar: [150, 150, 150],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: false },
    },
    balanced: {
        header: [60, 60, 60],
        leftSidebar: [150, 150, 150],
        rightSidebar: [150, 150, 150],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: false },
    },
    onlyHeader: {
        header: [60, 60, 60],
        leftSidebar: [0, 0, 0],
        rightSidebar: [0, 0, 0],
        footer: [0, 0, 0],
        toggles: { header: true, leftSidebar: false, rightSidebar: false, footer: false },
    },
    standardWithFooter: {
        header: [60, 60, 60],
        leftSidebar: [250, 150, 0],
        rightSidebar: [70, 150, 0],
        footer: [100, 70, 0],
        toggles: { header: true, leftSidebar: true, rightSidebar: true, footer: true },
    },
};

export interface CustomPresets {
    header?: PresetValue;
    leftSidebar?: PresetValue;
    rightSidebar?: PresetValue;
    footer?: PresetValue;
    toggles?: { header: boolean, leftSidebar: boolean, rightSidebar: boolean, footer: boolean };
}

export const getLayoutPresets = (typeOrPreset: PresetType, customValues?: CustomPresets) => {
    let layoutType: LayoutPreset;

        if (Object.keys(moduleToLayoutType).includes(typeOrPreset as ModulePreset)) {
        layoutType = moduleToLayoutType[typeOrPreset as ModulePreset];
    } else if (Object.keys(pageToLayoutType).includes(typeOrPreset as PagePreset)) {
        layoutType = pageToLayoutType[typeOrPreset as PagePreset];
    } else if (Object.keys(presets).includes(typeOrPreset as LayoutPreset)) {
        layoutType = typeOrPreset as LayoutPreset;
    } else {
        layoutType = 'standard';
        }


        const defaultValues = presets[layoutType];


    return {
        header: customValues?.header || defaultValues.header,
        leftSidebar: customValues?.leftSidebar || defaultValues.leftSidebar,
        rightSidebar: customValues?.rightSidebar || defaultValues.rightSidebar,
        footer: customValues?.footer || defaultValues.footer,
        toggles: customValues?.toggles || defaultValues.toggles
    };
};
