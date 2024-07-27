import ClickCounter from '@/app/trials/nested/components/ClickCounter';
import NavigationInput from '@/app/trials/nested/components/NavigationInput';
import React from 'react';


export default function Layout({children, params,}: { children: React.ReactNode; params: { module: string; data: string }; }) {

    return (
        <div className="space-y-9" style={{ padding: '20px', border: '1px solid #808080', borderRadius: '20px', margin: '20px' }}>
            <div className="flex justify-between">
                <h3>Data: {params.data}</h3>
                <div className="self-start">
                    <ClickCounter/>
                </div>
            </div>
            <NavigationInput id="item" label="Item" path={`/trials/nested/${params.module}/${params.data}`}/>
            <div>{children}</div>
        </div>
    );
}
