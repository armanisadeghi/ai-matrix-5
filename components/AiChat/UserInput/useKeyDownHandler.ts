import { useCallback } from 'react';

interface KeyDownOptions {
    key: string;
    preventDefault?: boolean;
}
const useKeyDownHandler = (
    callback: (e: React.KeyboardEvent) => void,
    options: KeyDownOptions = { key: 'Enter', preventDefault: true }
) => {
    return useCallback(
        (e: React.KeyboardEvent) => {
            const { key, preventDefault = true } = options;

            if (e.key === key && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (preventDefault) {
                    e.preventDefault();
                }
                callback(e);
            }
        },
        [options, callback]
    );
};

export default useKeyDownHandler;
