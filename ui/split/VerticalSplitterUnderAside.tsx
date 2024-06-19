// ui/split/VerticalSplitterUnderAside.tsx
import React, { CSSProperties, ReactNode, useState, useRef, useEffect } from 'react'
import Split from 'react-split'

interface VerticalSplitterProps {
    children: ReactNode[]
    initialSizes?: number[]
    sidebarRef?: React.RefObject<HTMLDivElement>
    asideRef?: React.RefObject<HTMLDivElement>
}

const VerticalSplitter: React.FC<VerticalSplitterProps> = ({
    children,
    initialSizes,
    sidebarRef,
    asideRef
}) => {
    const sections = children.length
    const rightSideSpace = 8
    const defaultSizes = Array(sections).fill(100 / sections)
    const [availableWidth, setAvailableWidth] = useState<number>(window.innerWidth - rightSideSpace)

    const [startingSizes, setStartingSizes] = useState<number[]>(initialSizes || defaultSizes)
    const [sizes, setSizes] = useState<number[]>(startingSizes)
    const gutters = useRef<HTMLDivElement[]>([])

    const rightSpacePercentage = (rightSideSpace / window.innerWidth) * 100
    const adjustedSizes = startingSizes.map((size) => size * (1 - rightSpacePercentage / 100))
    setSizes(adjustedSizes)

    useEffect(() => {
        const calculateAvailableWidth = () => {
            let newWidth = window.innerWidth
            if (sidebarRef?.current) {
                newWidth -= sidebarRef.current.clientWidth
            }
            if (asideRef?.current) {
                newWidth -= asideRef.current.clientWidth
            }
            setAvailableWidth(newWidth)
        }

        window.addEventListener('resize', calculateAvailableWidth)
        calculateAvailableWidth() // Initial calculation

        return () => {
            window.removeEventListener('resize', calculateAvailableWidth)
        }
    }, [sidebarRef, asideRef])

    const panelStyle: CSSProperties = {
        padding: '10px',
        height: '100%'
    }

    const gutterStyle: CSSProperties = {
        backgroundColor: '#403f3f'
    }

    return (
        <Split
            sizes={sizes}
            minSize={125}
            expandToMin={true}
            gutterSize={15}
            gutterAlign="center"
            snapOffset={10}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            onDragEnd={(newSizes) => setSizes(newSizes)}
            style={{ display: 'flex', width: availableWidth }}
            gutter={(index, direction) => {
                const gutter = document.createElement('div')
                gutter.style.cssText = `height: 100%; background-color: transparent; width: 30px; cursor: col-resize; position: relative;`

                const innerGutter = document.createElement('div')
                innerGutter.style.cssText = `height: 100%; background-color: ${gutterStyle.backgroundColor}; width: 1px; position: absolute; left: 2.5px;`
                gutter.appendChild(innerGutter)
                gutters.current[index] = gutter

                gutter.addEventListener('mouseenter', () => {
                    gutter.style.cursor = 'col-resize'
                })
                gutter.addEventListener('mouseleave', () => {
                    gutter.style.cursor = 'default'
                })

                return gutter
            }}
        >
            {children.map((child, index) => (
                <div key={index} style={panelStyle}>
                    {child}
                </div>
            ))}
        </Split>
    )
}

export default VerticalSplitter
