'use client';

import { clickCountState } from '@/app/trials/nested/state/atoms';
import { useRecoilState } from 'recoil';

export const useClickCounter = () => {
    const [count, setCount] = useRecoilState(clickCountState);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => prev - 1);

    return { count, increment, decrement };
};
