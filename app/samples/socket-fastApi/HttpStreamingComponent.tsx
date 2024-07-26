import React, { useState, useEffect } from 'react';

const HttpStreamingComponent = () => {
    const [chunks, setChunks] = useState([]);

    useEffect(() => {
        const fetchStream = async () => {
            const response = await fetch('http://localhost:8000/stream');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                setChunks((prevChunks) => [...prevChunks, chunk]);
            }
        };

        fetchStream();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">HTTP Streaming Chunks</h2>
            <div className="whitespace-pre-wrap">
                {chunks.join('')}
            </div>
        </div>
    );
};

export default HttpStreamingComponent;
