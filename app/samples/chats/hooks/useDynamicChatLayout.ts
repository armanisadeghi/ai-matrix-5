import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';

const useDynamicChatLayout = () => {
    const [bottomPadding, setBottomPadding] = useState(0);
    const [containerHeight, setContainerHeight] = useState('96%');
    const textareaContainerRef = useRef<HTMLDivElement>(null);
    const isSmallScreen = useMediaQuery('(max-width: 600px)');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (textareaContainerRef.current) {
                setBottomPadding(textareaContainerRef.current!.offsetHeight + 0);
            }

            const height = window.innerHeight;
            if (height > 1500) {
                setContainerHeight('95.5%');
            } else if (height > 1300) {
                setContainerHeight('96%');
            } else if (height > 1100) {
                setContainerHeight('96.5%');
            } else if (height > 800) {
                setContainerHeight('97%');
            } else if (height > 600) {
                setContainerHeight('97.5%');
            } else {
                setContainerHeight('98%');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

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
