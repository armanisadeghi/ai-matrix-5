export const generateKey = (pre: string | number): string => {
    return `${pre}_${new Date().getTime()}`;
};
