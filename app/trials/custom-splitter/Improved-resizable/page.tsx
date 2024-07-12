import ImprovedResizableLayout from '@/app/trials/custom-splitter/Improved-resizable/ImprovedResizableLayout';
import React from 'react';


function App() {
    return <ImprovedResizableLayout
        resizerSize={10}
        resizerLineSize={1}
        minSectionSize={50}
    />;
}

export default App;
