import { atom } from 'recoil';

export const leftSidebarAtom = atom({
    key: 'leftSidebarAtom',
    default: 0,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue) => {
                document.documentElement.style.setProperty('--sidebar-width', `${newValue}px`);
            });
        },
    ],
});

export const rightSidebarAtom = atom({
    key: 'rightSidebarAtom',
    default: 0,
    effects_UNSTABLE: [
        ({ onSet }) => {
            onSet((newValue) => {
                document.documentElement.style.setProperty('--sidebar-width', `${newValue}px`);
            });
        },
    ],
});
