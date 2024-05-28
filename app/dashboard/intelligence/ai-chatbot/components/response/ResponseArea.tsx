// chatbot/components/response/ResponseArea.tsx
import React from 'react';

const ResponseArea = ({ bottomPadding }: { bottomPadding: number }) => {
    return (
        <div style={{ paddingBottom: bottomPadding }}>
            <p>Chat responses will appear here.</p>
        </div>
    );
};

export default ResponseArea;
