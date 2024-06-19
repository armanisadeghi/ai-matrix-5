import React, { ReactNode } from 'react'
import VerticalSplitter from './VerticalSplitter'
import HorizontalSplitter from './HorizontalSplitter'

interface SectionContent {
    title: string
    content: ReactNode
}

interface SplitterProps {
    verticalSections: SectionContent[]
    horizontalSectionIndex?: number
    initialVerticalSizes?: number[]
    initialHorizontalSizes?: number[]
    horizontalSections?: SectionContent[]
}

const DynamicSplitter: React.FC<SplitterProps> = ({
    verticalSections,
    horizontalSectionIndex,
    initialVerticalSizes,
    initialHorizontalSizes,
    horizontalSections
}) => {
    return (
        <VerticalSplitter
            initialSizes={
                initialVerticalSizes ||
                Array(verticalSections.length).fill(100 / verticalSections.length)
            }
        >
            {verticalSections.map((section, index) => {
                if (
                    horizontalSectionIndex !== undefined &&
                    index === horizontalSectionIndex &&
                    horizontalSections
                ) {
                    return (
                        <HorizontalSplitter
                            key={index}
                            initialSizes={
                                initialHorizontalSizes ||
                                Array(horizontalSections.length).fill(
                                    100 / horizontalSections.length
                                )
                            }
                        >
                            {horizontalSections.map((hSection, hIndex) => (
                                <div key={hIndex}>
                                    <h1>{hSection.title}</h1>
                                    <p>{hSection.content}</p>
                                </div>
                            ))}
                        </HorizontalSplitter>
                    )
                }
                return (
                    <div key={index}>
                        <h1>{section.title}</h1>
                        <p>{section.content}</p>
                    </div>
                )
            })}
        </VerticalSplitter>
    )
}

export default DynamicSplitter
