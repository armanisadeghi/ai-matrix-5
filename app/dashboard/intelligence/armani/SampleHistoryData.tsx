import React, { useContext, useEffect } from 'react';
import { HistoryContext } from '@/context/AiContext/HistoryContext';

const SampleHistoryData = () => {
    const historyContext = useContext(HistoryContext);

    useEffect(() => {
        console.log('ChatSidebar mounted');
        console.log('ChatSidebar historyContext:', historyContext);
    }, [historyContext]);

    if (!historyContext) {
        console.log('ChatSidebar: historyContext is not available');
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Sample History Data</h2>
            {/* Displaying historyContext data */}
            <pre>{JSON.stringify(historyContext, null, 2)}</pre>
        </div>
    );
};

export default SampleHistoryData;
