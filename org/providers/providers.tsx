// ./components/providers.tsx
'use client'

import { Provider } from 'jotai'
import React, { ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default Providers
