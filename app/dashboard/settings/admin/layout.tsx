import { ReactNode } from 'react'
import { MainLayout } from '@/layout'

type Props = {
    children: ReactNode
}

export default function AgencyLayout({ children }: Props) {
    return <MainLayout>{children}</MainLayout>
}
