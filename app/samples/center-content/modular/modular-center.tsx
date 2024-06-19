// Updated PageLayout component
'use client'

import React, { useRef, ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { autoscrollStateAtom } from '../layoutAtoms'
import styles from '../CenterContent.module.css'
import { ScrollArea } from '@mantine/core'

interface PageLayoutProps {
    autoscroll?: boolean
    children?: ReactNode
    bottomSectionContent?: ReactNode
}

const defaultProps: PageLayoutProps = {
    autoscroll: true
}

const PageLayout: React.FC<PageLayoutProps> = (props) => {
    const { autoscroll, children, bottomSectionContent } = { ...defaultProps, ...props }

    const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom)
    const contentRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (autoscroll && isAutoscroll) {
            setIsAutoscroll(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftGapColumn}></div>
            <div className={styles.centerColumn}>
                <ScrollArea
                    h={250}
                    scrollbarSize={4}
                    scrollHideDelay={100}
                    className={styles.mainContent}
                >
                    {children}
                </ScrollArea>

                <div className={styles.bottomSection}>{bottomSectionContent}</div>
            </div>
            <div className={styles.rightGapColumn}></div>
        </div>
    )
}

export default PageLayout
