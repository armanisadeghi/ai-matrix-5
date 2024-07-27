// app/trials/custom-splitter/atomic-splitter/atoms.ts

import { atom, selector } from 'recoil';

export interface ContainerRef {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface Constraints {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export const themeState = atom<'light' | 'dark'>({
  key: 'themeState',
  default: 'light',
});

export const mouseDownState = atom<boolean>({
  key: 'mouseDownState',
  default: false,
});

export const activeHandleState = atom<string | null>({
  key: 'activeHandleState',
  default: null,
});

export const mousePositionState = atom<MousePosition>({
  key: 'mousePositionState',
  default: { x: 0, y: 0 },
});

export const containerRefState = atom<ContainerRef>({
  key: 'containerRefState',
  default: {
    top: 100,
    left: 100,
    width: 600,
    height: 600,
  },
});

export const constraintsState = atom<Constraints>({
  key: 'constraintsState',
  default: {
    minWidth: 200,
    minHeight: 200,
    maxWidth: 1000,
    maxHeight: 1000,
  },
});

export const containerStyleSelector = selector({
  key: 'containerStyleSelector',
  get: ({ get }) => {
    const containerRef = get(containerRefState);
    const theme = get(themeState);

    return {
      '--container-top': `${containerRef.top}px`,
      '--container-left': `${containerRef.left}px`,
      '--container-width': `${containerRef.width}px`,
      '--container-height': `${containerRef.height}px`,
      '--theme-class': theme === 'dark' ? 'theme-dark' : '',
    };
  },
});

export const isResizingSelector = selector({
  key: 'isResizingSelector',
  get: ({ get }) => {
    const mouseDown = get(mouseDownState);
    const activeHandle = get(activeHandleState);
    return mouseDown && activeHandle !== null;
  },
});

export const aspectRatioSelector = selector({
  key: 'aspectRatioSelector',
  get: ({ get }) => {
    const { width, height } = get(containerRefState);
    return width / height;
  },
});
