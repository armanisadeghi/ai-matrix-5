// app/chat/response/ParentComponent.tsx

import React from 'react'
import ResponseArea from './ResponseArea'
import { ResponseProvider } from './ResponseContext'

const ParentComponent: React.FC = () => {
    return (
        <ResponseProvider>
            <ResponseArea bottomPadding={50} />
        </ResponseProvider>
    )
}

export default ParentComponent
