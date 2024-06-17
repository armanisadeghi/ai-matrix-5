// hooks/animation/useAnimatedSize.ts
import { useEffect } from 'react';

type UseAnimatedSizeProps = {
    duration: number;
    endSize: number;
    animate: boolean;
};

const useAnimationSize = (setSize: (size: number) => void, { duration, endSize, animate }: UseAnimatedSizeProps) => {
    useEffect(() => {
        if (!animate) {
            setSize(endSize);
            return;
        }

        let start: number | null = null;
        let animationFrame: number | null = null;
        const initialSize = endSize; // Assuming the starting size is stored in endSize initially

        const animateSize = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

            const nextSize = initialSize + (endSize - initialSize) * easeOutQuart(Math.min(progress / duration, 1));
            setSize(nextSize);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animateSize);
            } else {
                setSize(endSize);
            }
        };

        animationFrame = requestAnimationFrame(animateSize);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [duration, endSize, animate, setSize]);
};

export default useAnimationSize;
