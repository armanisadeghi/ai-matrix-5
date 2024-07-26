import type { Metadata } from 'next';
import { Nav } from './components/Nav';


export const metadata: Metadata = {
    title: 'AI Matrix Engine Chat',
    description: 'Experience real-time AI chat with AI Matrix',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Nav/>
            {children}
        </>
    );
}
