import { ScrollArea } from "@mantine/core";
import { FC, ReactNode, RefObject } from "react";

import styles from "./CenterContent.module.css";

interface ResponsiveLayoutProps {
    textareaContainerRef?: RefObject<HTMLDivElement>;
    ameTextWithSliderProps: any;
    simpleChatSettingsList: string[];
    mainContent: ReactNode;
    bottomContent?: ReactNode;
}

const CenterContent: FC<ResponsiveLayoutProps> = ({ mainContent, bottomContent }) => {
    return (
        <div className={styles["ame-centerContent-container"]}>
            <div className={styles["ame-centerContent-leftGapColumn"]}></div>
            <div className={styles["ame-centerContent-centerColumn"]}>
                <ScrollArea
                    h={250}
                    scrollbarSize={4}
                    scrollHideDelay={500}
                    className={styles["ame-centerContent-mainContent"]}
                >
                    <div>
                        testing
                        {mainContent}
                        testing
                    </div>
                </ScrollArea>
                {bottomContent && (
                    <div className={styles["ame-centerContent-bottomSection"]}>
                        <div>{bottomContent}</div>
                    </div>
                )}
            </div>
            <div className={styles["ame-centerContent-rightGapColumn"]}></div>
        </div>
    );
};

export default CenterContent;
