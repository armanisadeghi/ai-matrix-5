import { useEffect, useRef, useCallback } from 'react';
import { autoscrollStateAtom } from '@/state/layoutAtoms';
import { useRecoilState } from 'recoil';

export const useAutoscroll = () => {
    const [isAutoscroll, setIsAutoscroll] = useRecoilState(autoscrollStateAtom);
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);
    const isUserScrollingRef = useRef(false);

    const scrollToBottom = useCallback(() => {
        if (scrollAreaRef.current && isAutoscroll) {
            const { scrollHeight, clientHeight } = scrollAreaRef.current;
            scrollAreaRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [isAutoscroll]);

    const handleScroll = useCallback(() => {
        if (scrollAreaRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

            if (isAtBottom && !isAutoscroll) {
                setIsAutoscroll(true);
            } else if (!isAtBottom && isAutoscroll) {
                setIsAutoscroll(false);
            }
        }
    }, [isAutoscroll, setIsAutoscroll]);

    useEffect(() => {
        const scrollArea = scrollAreaRef.current;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScroll);
            return () => scrollArea.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    if (!isUserScrollingRef.current) {
                        scrollToBottom();
                    }
                }
            });
        });

        if (scrollAreaRef.current) {
            observer.observe(scrollAreaRef.current, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }

        return () => observer.disconnect();
    }, [scrollToBottom]);

    useEffect(() => {
        const handleTouchStart = () => {
            isUserScrollingRef.current = true;
        };

        const handleTouchEnd = () => {
            isUserScrollingRef.current = false;
            handleScroll();
        };

        const scrollArea = scrollAreaRef.current;
        if (scrollArea) {
            scrollArea.addEventListener('touchstart', handleTouchStart);
            scrollArea.addEventListener('touchend', handleTouchEnd);
            return () => {
                scrollArea.removeEventListener('touchstart', handleTouchStart);
                scrollArea.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [handleScroll]);

    return scrollAreaRef;
};
