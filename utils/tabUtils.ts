/**
 * get active tab from url
 * @param url
 */
export const getActiveTab = (url: string): string => {
    return url.split("/")[url.split("/").length - 1];
};
