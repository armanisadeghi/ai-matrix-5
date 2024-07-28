import {
    deviceTypeAtom,
    footerAtom,
    footerToggleOptionsAtom,
    headerAtom,
    headerToggleOptionsAtom,
    leftSidebarAtom,
    leftSidebarMobileToggleOptionsAtom,
    leftSidebarToggleOptionsAtom,
    rightSidebarAtom,
    rightSidebarToggleOptionsAtom,
} from "@/state/layoutAtoms";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// Configuration for animation
const INTERVAL_TIME = 3; // Interval time in milliseconds
const DEFAULT_RATE = 10; // Default rate of size change per interval

const useToggleSizes = () => {
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);
    const [rightSidebarWidth, setRightSidebarWidth] = useRecoilState(rightSidebarAtom);
    const [headerHeight, setHeaderHeight] = useRecoilState(headerAtom);
    const [footerHeight, setFooterHeight] = useRecoilState(footerAtom);
    const deviceType = useRecoilValue(deviceTypeAtom);
    const [leftSidebarMobileOptions] = useRecoilState(leftSidebarMobileToggleOptionsAtom);

    const [leftSidebarOptions] = useRecoilState(leftSidebarToggleOptionsAtom);
    const [rightSidebarOptions] = useRecoilState(rightSidebarToggleOptionsAtom);
    const [footerOptions] = useRecoilState(footerToggleOptionsAtom);
    const [headerOptions] = useRecoilState(headerToggleOptionsAtom);

    const [isAnimating, setIsAnimating] = useState(false);

    const getNextSize = (currentSize: number, options: number[]) => {
        const sortedOptions = [...options].sort((a, b) => b - a);
        if (currentSize === 0) {
            return sortedOptions[0];
        }
        const nextSize = sortedOptions.find((size) => size < currentSize) || sortedOptions[sortedOptions.length - 1];
        return nextSize;
    };

    const animateSizeChange = (
        currentSize: number,
        setSize: (size: number) => void,
        targetSize: number,
        rate: number,
    ) => {
        const step = targetSize > currentSize ? rate : -rate;
        let newSize = currentSize;

        const interval = setInterval(() => {
            newSize += step;
            if ((step > 0 && newSize >= targetSize) || (step < 0 && newSize <= targetSize)) {
                newSize = targetSize;
                clearInterval(interval);
                setIsAnimating(false);
            }
            setSize(newSize);
        }, INTERVAL_TIME);
    };

    const toggleSize = (element: "leftSidebar" | "rightSidebar" | "footer" | "header", rate: number = DEFAULT_RATE) => {
        if (isAnimating) return;
        setIsAnimating(true);

        switch (element) {
            case "leftSidebar":
                const options = deviceType === "mobile" ? leftSidebarMobileOptions : leftSidebarOptions;
                animateSizeChange(leftSidebarWidth, setLeftSidebarWidth, getNextSize(leftSidebarWidth, options), rate);
                break;
            case "rightSidebar":
                animateSizeChange(
                    rightSidebarWidth,
                    setRightSidebarWidth,
                    getNextSize(rightSidebarWidth, rightSidebarOptions),
                    rate,
                );
                break;
            case "footer":
                animateSizeChange(footerHeight, setFooterHeight, getNextSize(footerHeight, footerOptions), rate);
                break;
            case "header":
                animateSizeChange(headerHeight, setHeaderHeight, getNextSize(headerHeight, headerOptions), rate);
                break;
            default:
                setIsAnimating(false);
                break;
        }
    };

    return { toggleSize };
};

export default useToggleSizes;
