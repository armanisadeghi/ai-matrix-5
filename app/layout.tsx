import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Inter } from 'next/font/google'
import { theme } from '@/theme'
import { UserProvider } from '@auth0/nextjs-auth0/client'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import 'mantine-datatable/styles.layer.css'

import './globals.css'

export const metadata = {
    title: 'AI Matrix | Next-Generation AI Automation Framework',
    description: 'Bridging the gap between AI capabilities and real-world business.'
}

const inter = Inter({
    subsets: ['latin'],
    display: 'swap'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <html lang="en" className={inter.className}>
                <head>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
                    <meta name="theme-color" content="#333333" />
                    <title>AI Matrix</title>
                    <ColorSchemeScript defaultColorScheme="dark" />
                </head>
                <body>
                    <MantineProvider theme={theme} defaultColorScheme="dark">
                        <Notifications position="bottom-right" zIndex={1000} />
                        <ModalsProvider>{children}</ModalsProvider>
                    </MantineProvider>
                </body>
            </html>
        </UserProvider>
    )
}
