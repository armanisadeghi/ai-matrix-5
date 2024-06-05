// chat-app/components/response/ParentComponent.tsx

import React from 'react';
import ResponseArea from './ResponseArea';
import { ResponseProvider } from '../../../../../../context/AiContext/ResponseContext';

const ParentComponent: React.FC = () => {
    return (
        <ResponseProvider>
            <ResponseArea bottomPadding={50} />
        </ResponseProvider>
    );
};

export default ParentComponent;
