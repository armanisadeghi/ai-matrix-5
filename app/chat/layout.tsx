"use client";
import React, { ReactNode } from 'react'
import { AppsLayout } from '@/layout';
import { ChatProvider } from '@/context/chatContext';

type Props = {
    children: ReactNode;
};

export default function ChatLayout({children}: Props) {
    return <AppsLayout><ChatProvider>{children}</ChatProvider></AppsLayout>
}
