'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const useDynamicDimensions = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        elementTop: 0,
        elementLeft: 0,
        elementRight: 0,
        elementBottom: 0,
        elementWidth: 0,
        elementHeight: 0,
        viewportHeight: 0,
        viewportWidth: 0,
        availableHeight: 0,
        availableWidth: 0,
        remainingHeightAfterElement: 0,
        remainingWidthAfterElement: 0,
    });

    const updateDimensions = useCallback(() => {
        if (typeof window !== 'undefined' && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const availableHeight = window.innerHeight - rect.top;
            const availableWidth = window.innerWidth - rect.left;
            const remainingHeightAfterElement = window.innerHeight - rect.bottom;
            const remainingWidthAfterElement = window.innerWidth - rect.right;

            setDimensions({
                elementTop: rect.top,
                elementLeft: rect.left,
                elementRight: rect.right,
                elementBottom: rect.bottom,
                elementWidth: rect.width,
                elementHeight: rect.height,
                viewportHeight: window.innerHeight,
                viewportWidth: window.innerWidth,
                availableHeight,
                availableWidth,
                remainingHeightAfterElement,
                remainingWidthAfterElement,
            });
        }
    }, [ref]);

    useEffect(() => {
        updateDimensions();
        if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
        }
    }, [updateDimensions]);

    return [ref, dimensions] as const;
};

export default useDynamicDimensions;
