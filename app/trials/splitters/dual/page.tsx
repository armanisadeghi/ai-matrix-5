'use client';
import React from 'react';
import DynamicSplitter from '@/ui/split/DynamicSplitter';

const App: React.FC = () => {
    const verticalSections = [
        { title: 'Section 1', content: 'Content 1.' },
        { title: 'Section 2', content: 'Content 2.' },
        { title: 'Section 3', content: 'Content 3.' },
        { title: 'Section 4', content: 'Content 4.' }
    ];

    const horizontalSections = [
        { title: 'Top Subsection', content: 'Content for the top subsection.' },
        { title: 'Middle Subsection', content: 'Content for the Middle subsection.' },
        { title: 'Bottom Subsection', content: 'Content for the bottom subsection.' }
    ];

    return (
        <DynamicSplitter
            verticalSections={verticalSections}
            horizontalSectionIndex={1} // Second section (index 1) will be split horizontally
            initialVerticalSizes={[25, 25, 25, 25]} // Custom sizes for vertical sections
            initialHorizontalSizes={[40, 30, 30]} // Custom sizes for horizontal subsections
            horizontalSections={horizontalSections}
        />
    );
};

export default App;
