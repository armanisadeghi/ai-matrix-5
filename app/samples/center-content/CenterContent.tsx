import React, { FC, ReactNode, RefObject } from 'react';
import { ScrollArea } from '@mantine/core';
import styles from './CenterContent.module.css';

interface ResponsiveLayoutProps {
    textareaContainerRef?: RefObject<HTMLDivElement>;
    ameTextWithSliderProps: any;
    simpleChatSettingsList: string[];
    mainContent: ReactNode;
    bottomContent?: ReactNode;
}

const CenterContent: FC<ResponsiveLayoutProps> = (
    {
        mainContent,
        bottomContent,
    }) => {

    return (
        <div className={styles.container}>
            <div className={styles.leftGapColumn}></div>
            <div className={styles.centerColumn}>
                <ScrollArea h={250} scrollbarSize={4} scrollHideDelay={500} className={styles.mainContent}>
                    <div>
                        {mainContent}
                    </div>
                </ScrollArea>
                {bottomContent && (
                    <div className={styles.bottomSection}>
                        <div>
                            {bottomContent}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.rightGapColumn}></div>
        </div>
    );
};

export default CenterContent;
