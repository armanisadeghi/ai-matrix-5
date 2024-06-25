/* import { useEffect, useRef } from 'react';

export const useScrollAnimation = (delay: number = 500) => {
    const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLDivElement;
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                    observer.unobserve(element);
                }
            });
            },
            { threshold: 0.1 }
        );

        elementsRef.current.forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [delay]);

    return elementsRef;
};
 */

import { useEffect, useRef } from 'react';

export const useScrollAnimation = (delay: number = 500) => {
    const elementsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLElement;
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                    observer.unobserve(element);
                }
            });
            },
            { threshold: 0.1 }
        );

        elementsRef.current.forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [delay]);

    return elementsRef;
};
