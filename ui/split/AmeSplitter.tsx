import React, { ReactNode, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PreciseSplitter, PreciseSplitterProps } from '@/ui/split/PreciseVerticalSplitter'
import {
    availableHeightSelector,
    availableWidthSelector,
    windowHeightState,
    windowWidthState
} from '@/context/atoms/layoutAtoms'

interface ParentSplitterContainerProps {
    children: ReactNode[]
    initialSizes?: number[]
}

const AmeSplitter: React.FC<ParentSplitterContainerProps> = ({ children, initialSizes }) => {
    const setWindowWidth = useSetRecoilState(windowWidthState)
    const setWindowHeight = useSetRecoilState(windowHeightState)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [setWindowWidth, setWindowHeight])

    const availableWidth = useRecoilValue(availableWidthSelector)
    const availableHeight = useRecoilValue(availableHeightSelector)

    console.log('VerticalSplitter availableWidth', availableWidth)
    console.log('VerticalSplitter availableHeight', availableHeight)

    return (
        <div>
            <PreciseSplitter
                children={children}
                initialSizes={initialSizes}
                initialWidth={availableWidth.width}
                initialHeight={availableHeight.height}
            />
        </div>
    )
}

export default AmeSplitter
