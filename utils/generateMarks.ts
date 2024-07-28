// utils/generateMarks.ts
export const generateMarks = (map: Map<any, number>): { value: number; label: string }[] => {
    const marks: { value: number; label: string }[] = [];
    map.forEach((value, key) => {
        marks.push({ value, label: key });
    });
    return marks;
};
