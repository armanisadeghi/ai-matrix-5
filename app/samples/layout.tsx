// app/samples/layout.tsx
'use client'

import React, { useEffect } from 'react'
import { LayoutProvider } from '@/context/LayoutContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { MainLayout } from '@/layout'
import { ReactNode } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { activeUserAtom } from '@/state/userAtoms'
import ErrorBoundary from '@/components/ErrorManagement/ErrorBoundary'
import { PresetType } from '@/context/atoms/layoutAtoms'
import Loading from '@/app/dashboard/loading'
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client'
import { useCompleteUserProfile } from '@/hooks/users/useMatrixUser'
import { presetTypeAtom } from '@/state/layoutAtoms'
import { Box, LoadingOverlay } from '@mantine/core'

type Props = {
    children: ReactNode
    preset: PresetType
}

const LayoutContent: React.FC = () => {
    const { user, error, isLoading } = useUser()
    const [activeUser, setActiveUser] = useRecoilState(activeUserAtom)
    const [presetType, setPresetType] = useRecoilState(presetTypeAtom)

    useEffect(() => {
        setPresetType('dashboard')

        if (user) {
            setActiveUser(user as any)
        }
    }, [user])
    useCompleteUserProfile()

    if (isLoading) {
        return (
            <div className="page-layout">
                <Box pos="relative">
                    <LoadingOverlay
                        visible={true}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: 'pink', type: 'bars' }}
                    />
                    {/* ...other content */}
                </Box>
            </div>
        )
    }

    if (error) {
        console.error('Error loading user:', error)
        return
    }

    return null
}

function Layout({ children, preset }: Props) {
    return (
        <UserProvider>
            <ErrorBoundary>
                <RecoilRoot>
                    <LayoutProvider>
                        <SidebarProvider>
                            <MainLayout>
                                <LayoutContent />
                                {children}
                            </MainLayout>
                        </SidebarProvider>
                    </LayoutProvider>
                </RecoilRoot>
            </ErrorBoundary>
        </UserProvider>
    )
}

export default Layout
