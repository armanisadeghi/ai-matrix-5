import React, { ReactNode } from 'react';
import { PreciseSplitter } from "@/ui/split/PreciseVerticalSplitter";
import useDynamicDimensions from '@/hooks/layout/useDynamicDimensions';

interface ParentSplitterContainerProps {
    children: ReactNode[];
    initialSizes?: number[];
}

const AmeSplitter: React.FC<ParentSplitterContainerProps> = ({ children, initialSizes }) => {
    const [ref, dimensions] = useDynamicDimensions();

    console.log('VerticalSplitter availableWidth', dimensions.availableWidth);
    console.log('VerticalSplitter availableHeight', dimensions.availableHeight);

    return (
        <div ref={ref} style={{ height: '100%', width: '100%' }}>
            <PreciseSplitter
                children={children}
                initialSizes={initialSizes}
                initialWidth={dimensions.availableWidth}
                initialHeight={dimensions.availableHeight}
            />
        </div>
    );
};

export default AmeSplitter;
