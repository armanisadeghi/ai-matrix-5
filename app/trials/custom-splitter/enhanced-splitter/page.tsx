import React from 'react';
import EnhancedResizableLayout from './EnhancedResizableLayout';


function App() {
    return <EnhancedResizableLayout
        direction="horizontal"
        initialSizes={[300, 300]}
        minSizes={[100, 100]}
        maxSizes={[500, 500]}
    />;
}

export default App;
