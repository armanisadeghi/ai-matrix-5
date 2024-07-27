// Frontend (React)
import { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource('/api/sse');
        eventSource.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };
        return () => eventSource.close();
    }, []);

    return <div>{JSON.stringify(data)}</div>;
}
