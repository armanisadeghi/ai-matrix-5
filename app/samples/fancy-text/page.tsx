// app/samples/fancy-text/page.tsx
'use client'

import AmeTextAreaFancy from '@/ui/textarea/AmeTextAreaFancy'
import React from 'react'
import { AtomName } from '@/state/aiAtoms/settingsAtoms'

export default function Index() {
    return (
        <AmeTextAreaFancy
            label="Text Area"
            placeholder="Enter text here..."
            settingAtomNames={[
                'submitOnEnter',
                'makeSmallTalk',
                'quickAnswer',
                'improveQuestions',
                'aiPreferencesMain',
                'stopSequence',
                'aiPreferencesSecond',
                'matrixLevel'
            ]}
        ></AmeTextAreaFancy>
    )
}
