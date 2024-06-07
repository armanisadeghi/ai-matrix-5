// context/atoms/layoutAtoms.ts
import { atom, selector, waitForAll } from 'recoil';

export type PresetType =
    | "Standard"
    | "MinimalNav"
    | "IconsFullAside"
    | "IconsCompactAside"
    | "Balanced"
    | "Public";

export const presetAtom = atom<PresetType>({
    key: 'presetState',
    default: 'Standard',
});

export const splitterDimensionsState = atom({
    key: 'splitterDimensionsState',
    default: { width: 0, height: 0 },
});



export const headerHeightDirectAtom = atom({
    key: 'headerHeightDirectAtom',
    default: null,
});

export const footerHeightDirectAtom = atom({
    key: 'footerHeightDirectAtom',
    default: null,
});

export const navbarWidthDirectAtom = atom({
    key: 'navbarWidthDirectAtom',
    default: null,
});

export const sidebarWidthDirectAtom = atom({
    key: 'sidebarWidthDirectAtom',
    default: null,
});

export const windowWidthState = atom({
    key: 'windowWidthState',
    default: null,
});

export const windowHeightState = atom({
    key: 'windowHeightState',
    default: null,
});

export const availableWidthSelector = selector({
    key: 'availableWidthSelector',
    get: ({ get }) => {
        const dimensions = get(waitForAll({
            leftNavWidth: navbarWidthDirectAtom,
            rightNavWidth: sidebarWidthDirectAtom,
            windowWidth: windowWidthState
        }));
        console.log('Width Data:', dimensions);
        return dimensions;
    }
});

export const availableHeightSelector = selector({
    key: 'availableHeightSelector',
    get: ({ get }) => {
        const heights = get(waitForAll({
            headerHeight: headerHeightDirectAtom,
            footerHeight: footerHeightDirectAtom,
            windowHeight: windowHeightState
        }));
        console.log('Height Data:', heights);
        return heights;
    }
});





