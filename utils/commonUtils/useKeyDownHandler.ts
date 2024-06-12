import { useCallback } from 'react';
import { useRecoilValue } from "recoil";
import { submitOnEnterAtom } from "@/state/aiAtoms/settingsAtoms";

// This works with an atom that can be set and used from any component
// Creates consistency across the app for how the "enter" key is handled
// For text areas or inputs that have "enter" key functionality to submit
// These are the little things that make an application feel polished & user-friendly.


interface KeyDownOptions {
    key: string;
    preventDefault?: boolean;
}

const useKeyDownHandler = (
    callback: (e: React.KeyboardEvent) => void,
    options: KeyDownOptions = { key: 'Enter', preventDefault: true }
) => {
    const submitOnEnterSetting = useRecoilValue(submitOnEnterAtom.atom);

    return useCallback(
        (e: React.KeyboardEvent) => {
            const { key, preventDefault = true } = options;

            console.log('Key pressed:', e.key, 'Event:', e);
            console.log('Submit on Enter setting:', submitOnEnterSetting);

            if (submitOnEnterSetting) {
                // Submit if Enter is pressed without modifiers
                if (e.key === key && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    console.log('Submitting on Enter without modifiers');
                    if (preventDefault) {
                        console.log('Preventing default action');
                        e.preventDefault();
                    }
                    callback(e);
                }
            } else {
                // Submit if Enter is pressed with Shift key
                if (e.key === key && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    console.log('Submitting on Enter with Shift key');
                    if (preventDefault) {
                        console.log('Preventing default action');
                        e.preventDefault();
                    }
                    callback(e);
                }
            }
        },
        [options, callback, submitOnEnterSetting]
    );
};

export default useKeyDownHandler;
