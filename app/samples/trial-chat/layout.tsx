// app/samples/trial-chat/layout.tsx
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
    <div>
            {children}
    </div>
    )
}
