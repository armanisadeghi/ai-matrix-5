'use client';

import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const useDynamicChatLayout = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [containerHeight, setContainerHeight] = useState('96%');
    const textareaContainerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    const adjustLayout = () => {
        if (textareaContainerRef.current) {
            setBottomPadding(textareaContainerRef.current.offsetHeight + 0);
        }

        const height = window.innerHeight;
        if (height > 1600) {
            setContainerHeight('87%');
        } else if (height > 1300) {
            setContainerHeight('85%');
        } else if (height > 1150) {
            setContainerHeight('84%');
        } else if (height > 1000) {
            setContainerHeight('83%');
        } else if (height > 900) {
            setContainerHeight('82%');
        } else if (height > 850) {
            setContainerHeight('81%');
        } else if (height > 800) {
            setContainerHeight('79%');
        } else if (height > 750) {
            setContainerHeight('78%');
        } else if (height > 700) {
            setContainerHeight('77%');
        } else {
            setContainerHeight('77%');
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            adjustLayout();
        };

        window.addEventListener('resize', handleResize);
        adjustLayout(); // Call adjustLayout immediately after setting the event listener

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        bottomPadding,
        containerHeight,
        textareaContainerRef,
        isSmallScreen,
    };
};

export default useDynamicChatLayout;

