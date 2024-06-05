// app/samples/trial-chat/layout.tsx
import { Providers } from '@/org/providers/providers'
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
    <div>
        <Providers>
            {children}
        </Providers>
    </div>
    )
}
