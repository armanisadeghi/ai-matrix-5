// utils/generateMarks.ts
import { LayoutState } from '@/state/layoutAtoms';

export const generateMarks = (map: Map<LayoutState, number>): { value: number; label: string }[] => {
    const marks: { value: number; label: string }[] = [];
    map.forEach((value, key) => {
        marks.push({ value, label: key });
    });
    return marks;
};
