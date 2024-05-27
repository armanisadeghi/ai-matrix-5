// app/dashboard/layout.tsx

import { ReactNode } from 'react';
import { MainLayout } from '@/layout';

type Props = {
  children: ReactNode;
};

function DashboardPageLayout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}

export default DashboardPageLayout;
