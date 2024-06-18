/*
// hooks/usePriorityLayout.ts
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingStateAtom, priorityStateAtom, PriorityLevel, rightSidebarAtom, leftSidebarAtom, footerAtom, headerAtom } from "@/state/layoutAtoms";


const usePriorityLayout = (layoutType: string, priority: PriorityLevel) => {
    const [headerHeight, setHeaderHeight] = useRecoilState(headerAtom);
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);
    const [rightSidebarWidth, setRightSidebarWidth] = useRecoilState(rightSidebarAtom);
    const [footerHeight, setFooterHeight] = useRecoilState(footerAtom);
    const isLoading = useRecoilValue(loadingStateAtom);
    const [currentPriority, setCurrentPriority] = useRecoilState(priorityStateAtom);

    const presets = {
        header: [80, 70, 60],
        leftSidebar: [300, 200, 0],
        rightSidebar: [200, 100, 0],
        footer: [100, 50, 0],
    };

    useEffect(() => {
        if (!isLoading && currentPriority === priority) {
            const sizeIndex = 0; // Adjust according to your logic
            setHeaderHeight(presets.header[sizeIndex]);
            setLeftSidebarWidth(presets.leftSidebar[sizeIndex]);
            setRightSidebarWidth(presets.rightSidebar[sizeIndex]);
            setFooterHeight(presets.footer[sizeIndex]);
        }
    }, [isLoading, currentPriority, priority, setHeaderHeight, setLeftSidebarWidth, setRightSidebarWidth, setFooterHeight]);

    useEffect(() => {
        if (!isLoading) {
            setCurrentPriority(priority);
        }
    }, [isLoading, priority, setCurrentPriority]);

    return null;
};

export default usePriorityLayout;
*/
