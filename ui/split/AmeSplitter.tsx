// ui/split/AmeSplitter.tsx
import React, { ReactNode } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PreciseSplitter, PreciseSplitterProps } from "@/ui/split/PreciseVerticalSplitter";
import {
    availableHeightSelector,
    availableWidthSelector,
    windowHeightState,
    windowWidthState
} from "@/context/atoms/layoutAtoms";

interface ParentSplitterContainerProps {
    children: ReactNode[];
    initialSizes?: number[];
}

const AmeSplitter: React.FC<ParentSplitterContainerProps> = ({ children, initialSizes }) => {
    const setWindowWidth = useSetRecoilState(windowWidthState);
    const setWindowHeight = useSetRecoilState(windowHeightState);

    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const availableWidth = useRecoilValue(availableWidthSelector);
    const initialWidth = availableWidth.width;
    const availableHeight = useRecoilValue(availableHeightSelector);
    const initialHeight = availableHeight.height;


    console.log('VerticalSplitter availableWidth', availableWidth);
    console.log('VerticalSplitter availableHeight', availableHeight);



    return (
        <div>
            <PreciseSplitter children={children} initialSizes={initialSizes} initialWidth={initialWidth} initialHeight={initialHeight}>
            </PreciseSplitter>
        </div>
    );
};

export default AmeSplitter;