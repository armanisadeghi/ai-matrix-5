import ClickCounter from '@/app/trials/nested/components/ClickCounter';
import NavigationInput from '@/app/trials/nested/components/NavigationInput';
import React from 'react';


export default function Layout({children, params,}: { children: React.ReactNode; params: { module: string }; }) {

    return (
        <div style={{ padding: '20px', border: '1px solid #808080', borderRadius: '20px', margin: '20px' }}>
            <div className="flex justify-between">
                <h2>Module: {decodeURIComponent(params.module)}</h2>
                <div className="self-start">
                    <ClickCounter />
                </div>
            </div>
            <NavigationInput id="data" label="Data" path={`/trials/nested/${params.module}`} queryParams={{ color: 'red' }} />
            <div>{children}</div>
        </div>
    );
}
