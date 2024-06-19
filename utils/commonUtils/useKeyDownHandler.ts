import { useCallback } from 'react'
import { submitOnEnterAtom } from '@/state/aiAtoms/settingsAtoms'
import { useRecoilValue } from 'recoil'

// This works with an atom that can be set and used from any component
// Creates consistency across the app for how the "enter" key is handled
// For text areas or inputs that have "enter" key functionality to submit
// These are the little things that make an application feel polished & user-friendly.

interface KeyDownOptions {
    key: string
    preventDefault?: boolean
}

const useKeyDownHandler = (
    callback: (e: React.KeyboardEvent) => void,
    options: KeyDownOptions = { key: 'Enter', preventDefault: true }
) => {
    const submitOnEnterSetting = useRecoilValue(submitOnEnterAtom)

    return useCallback(
        (e: React.KeyboardEvent) => {
            const { key, preventDefault = true } = options

            if (submitOnEnterSetting) {
                // Submit if Enter is pressed without modifiers
                if (e.key === key && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    if (preventDefault) {
                        e.preventDefault()
                    }
                    callback(e)
                }
            } else {
                // Submit if Enter is pressed with Shift key
                if (e.key === key && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    if (preventDefault) {
                        e.preventDefault()
                    }
                    callback(e)
                }
            }
        },
        [options, callback, submitOnEnterSetting]
    )
}

export default useKeyDownHandler
