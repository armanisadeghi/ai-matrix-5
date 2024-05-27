import { ReactNode } from 'react';
import SmallSidebarLayout from '../layout-small-nav';

type Props = {
    children: ReactNode;
};

function IntelligenceAppLayout({ children }: Props) {
    return (
        <SmallSidebarLayout>
            {children}
        </SmallSidebarLayout>
    );
}

export default IntelligenceAppLayout;
