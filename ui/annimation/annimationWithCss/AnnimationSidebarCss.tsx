import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { rightSidebarAtom, leftSidebarAtom } from "@/state/layoutAtoms";

interface AnimatedSidebarProps {
    duration: number; // Duration of the animation in milliseconds
    startSize: number; // Starting size of the sidebars
    endSize: number; // Target size of the sidebars
}

const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({ duration, startSize, endSize }) => {
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);
    const [rightSidebarWidth, setRightSidebarWidth] = useRecoilState(rightSidebarAtom);

    useEffect(() => {
        setLeftSidebarWidth(startSize);
        setRightSidebarWidth(startSize);

        const leftSidebarElement = document.getElementById('left-sidebar');
        const rightSidebarElement = document.getElementById('right-sidebar');

        if (leftSidebarElement && rightSidebarElement) {
            leftSidebarElement.style.transition = `width ${duration}ms ease-out`;
            rightSidebarElement.style.transition = `width ${duration}ms ease-out`;

            requestAnimationFrame(() => {
                setLeftSidebarWidth(endSize);
                setRightSidebarWidth(endSize);
            });
        }
    }, [duration, startSize, endSize, setLeftSidebarWidth, setRightSidebarWidth]);

    return null;
};

export default AnimatedSidebar;
