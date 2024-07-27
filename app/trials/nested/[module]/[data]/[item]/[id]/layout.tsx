import React from 'react';
import ClickCounter from '@/app/trials/nested/components/ClickCounter';
import NavigationInput from '@/app/trials/nested/components/NavigationInput';


export default function Layout({children, params,}: { children: React.ReactNode; params: { module: string; data: string; item: string; id: string }; }) {
    return (
        <div className="space-y-9" style={{ padding: '20px', border: '1px solid #808080', borderRadius: '20px', margin: '20px' }}>
            <div className="flex justify-between">
                <h5>ID: {params.id}</h5>
                <div className="self-start">
                    <ClickCounter/>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}
