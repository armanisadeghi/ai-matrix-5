/*
// hooks/useLayout.ts
import { useRecoilState, RecoilState } from 'recoil';
import { rightSidebarAtom, leftSidebarAtom, footerAtom, headerAtom } from '@/state/layoutAtoms';
import { LayoutState, getSize, sidebarWidthMap, footerHeightMap, headerHeightMap } from '@/state/layoutAtoms';

type LayoutElement = 'rightSidebar' | 'leftSidebar' | 'footer' | 'header';

// Moved from atom page because I don't think we need these anymore:

export type LayoutState = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'hidden' | 'custom';

export const sidebarWidthMap = new Map<LayoutState, number>([
    ['xl', 300],
    ['lg', 250],
    ['md', 200],
    ['sm', 150],
    ['xs', 70],
    ['hidden', 0],
    ['custom', 0], // Placeholder, to be overridden by custom size
]);

export const footerHeightMap = new Map<LayoutState, number>([
    ['xl', 250],
    ['lg', 200],
    ['md', 150],
    ['sm', 70],
    ['xs', 50],
    ['hidden', 0],
    ['custom', 0],
]);

export const headerHeightMap = new Map<LayoutState, number>([
    ['xl', 100],
    ['lg', 80],
    ['md', 70],
    ['sm', 60],
    ['xs', 50],
    ['hidden', 0],
    ['custom', 0],
]);

export const getSize = (map: Map<LayoutState, number>, state: LayoutState, customSize: number = 0) => {
    if (state === 'custom') {
        return customSize;
    }
    return map.get(state) || 0;
};


const layoutAtomMap: Record<LayoutElement, RecoilState<number>> = {
    rightSidebar: rightSidebarAtom,
    leftSidebar: leftSidebarAtom,
    footer: footerAtom,
    header: headerAtom,
};

const layoutSizeMap: Record<LayoutElement, Map<LayoutState, number>> = {
    rightSidebar: sidebarWidthMap,
    leftSidebar: sidebarWidthMap,
    footer: footerHeightMap,
    header: headerHeightMap,
};

export const useLayout = () => {
    const [rightSideBarWidth, setRightSidebar] = useRecoilState(rightSidebarAtom);
    const [leftSideBarWidth, setLeftSidebar] = useRecoilState(leftSidebarAtom);
    const [footerHeight, setFooter] = useRecoilState(footerAtom);
    const [headerHeight, setHeader] = useRecoilState(headerAtom);

    const setLayout = (element: LayoutElement, state: LayoutState, customSize: number = 0) => {
        const atom = layoutAtomMap[element];
        const sizeMap = layoutSizeMap[element];
        const size = getSize(sizeMap, state, customSize);

        switch (element) {
            case 'rightSidebar':
                setRightSidebar(size);
                break;
            case 'leftSidebar':
                setLeftSidebar(size);
                break;
            case 'footer':
                setFooter(size);
                break;
            case 'header':
                setHeader(size);
                break;
            default:
                break;
        }
    };

    return { setLayout, rightSideBarWidth, leftSideBarWidth, footerHeight, headerHeight };
};
*/
