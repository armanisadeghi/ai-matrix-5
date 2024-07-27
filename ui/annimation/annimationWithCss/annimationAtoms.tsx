import { atom } from 'recoil';


// This atom name is duplicated and it will cause problems. Need to fix it. Most likely by combining them.

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
