// ui/animation/AnimatedSidebar.tsx
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { leftSidebarAtom, presetMethodAtom, rightSidebarAtom } from "@/state/layoutAtoms";

interface AnimatedSidebarProps {
    duration: number;
    startSize?: number;
    endSize: number;
}

const AnimatedSidebar: React.FC<AnimatedSidebarProps> = ({ duration, startSize, endSize }) => {
    const setLeftSidebarWidth = useSetRecoilState(leftSidebarAtom);
    const setRightSidebarWidth = useSetRecoilState(rightSidebarAtom);
    const [currentPriority, setCurrentPriority] = useRecoilState(presetMethodAtom);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        const initialStartSize = startSize ?? windowWidth / 2;

        let start: number | null = null;
        let animationFrame: number | null = null;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

            const nextSize = initialStartSize + (endSize - initialStartSize) * easeOutQuart(Math.min(progress / duration, 1));

            setLeftSidebarWidth(nextSize);
            setRightSidebarWidth(nextSize);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setLeftSidebarWidth(endSize);
                setRightSidebarWidth(endSize);
                setCurrentPriority("none");
            }
        };
        setCurrentPriority("custom");
        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            setCurrentPriority("none");
        };
    }, [duration, startSize, endSize, setLeftSidebarWidth, setRightSidebarWidth, setCurrentPriority]);

    return null;
};

export default AnimatedSidebar;
