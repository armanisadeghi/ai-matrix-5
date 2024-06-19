import { ReactNode } from 'react'
import { MainLayout } from '@/layout'

type Props = {
    children: ReactNode
}

function TreeViewLayout({ children }: Props) {
    return <MainLayout>{children}</MainLayout>
}

export default TreeViewLayout
