# Splitter Documentation

## Overview

This documentation provides a guide on how to use the `VerticalSplitter`, `HorizontalSplitter`, and `DynamicSplitter` components. Each component is designed to create resizable split layouts for your React application. Examples for each component are included to demonstrate their usage.

### VerticalSplitter Component

The `VerticalSplitter` component creates a vertically split layout, allowing for dynamic resizing of sections by dragging the gutters between them.

#### Props

-   **children** (ReactNode[]): An array of React nodes representing the content to be displayed within each split section. (Required)
-   **initialSizes** (number[]): An optional array of numbers representing the initial sizes (in percentages) of each split section. Defaults to equal distribution.

#### Example Usage

```tsx
import React from 'react'
import VerticalSplitter from '@/ui/split/VerticalSplitter'

const VerticalExample: React.FC = () => {
    return (
        <VerticalSplitter initialSizes={[50, 50]}>
            <div>
                <h1>Left Section</h1>
                <p>Content for the left section.</p>
            </div>
            <div>
                <h1>Right Section</h1>
                <p>Content for the right section.</p>
            </div>
        </VerticalSplitter>
    )
}

export default VerticalExample
```

### HorizontalSplitter Component

The `HorizontalSplitter` component creates a horizontally split layout, allowing for dynamic resizing of sections by dragging the gutters between them.

#### Props

-   **children** (ReactNode[]): An array of React nodes representing the content to be displayed within each split section. (Required)
-   **initialSizes** (number[]): An optional array of numbers representing the initial sizes (in percentages) of each split section. Defaults to equal distribution.

#### Example Usage

```tsx
import React from 'react'
import HorizontalSplitter from '@/ui/split/HorizontalSplitter'

const HorizontalExample: React.FC = () => {
    return (
        <HorizontalSplitter initialSizes={[70, 30]}>
            <div>
                <h1>Top Section</h1>
                <p>Content for the top section.</p>
            </div>
            <div>
                <h1>Bottom Section</h1>
                <p>Content for the bottom section.</p>
            </div>
        </HorizontalSplitter>
    )
}

export default HorizontalExample
```

### DynamicSplitter Component

The `DynamicSplitter` component provides a flexible layout that can dynamically generate up to 4 vertical sections and allows one of those sections to be split horizontally into multiple sections.

#### Props

-   **verticalSections** (SectionContent[]): An array of objects defining the title and content for each vertical section. (Required)
-   **horizontalSectionIndex** (number): An optional index specifying which vertical section should be split horizontally. If not provided, no horizontal split will occur.
-   **initialVerticalSizes** (number[]): An optional array defining the initial sizes (in percentages) of each vertical section. Defaults to equal distribution.
-   **initialHorizontalSizes** (number[]): An optional array defining the initial sizes (in percentages) of each horizontal subsection. Defaults to equal distribution.
-   **horizontalSections** (SectionContent[]): An optional array of objects defining the title and content for each horizontal subsection. Required if `horizontalSectionIndex` is provided.

#### Example Usage

```tsx
import React from 'react'
import DynamicSplitter from '@/nice-working/DynamicSplitter'

const DynamicExample: React.FC = () => {
    const verticalSections = [
        { title: 'Section 1', content: 'Content for section 1.' },
        { title: 'Section 2', content: 'Content for section 2.' },
        { title: 'Section 3', content: 'Content for section 3.' },
        { title: 'Section 4', content: 'Content for section 4.' }
    ]

    const horizontalSections = [
        { title: 'Top Subsection', content: 'Content for the top subsection.' },
        { title: 'Bottom Subsection', content: 'Content for the bottom subsection.' }
    ]

    return (
        <DynamicSplitter
            verticalSections={verticalSections}
            horizontalSectionIndex={1} // Second section (index 1) will be split horizontally
            initialVerticalSizes={[25, 50, 15, 10]} // Custom sizes for vertical sections
            initialHorizontalSizes={[70, 30]} // Custom sizes for horizontal subsections
            horizontalSections={horizontalSections}
        />
    )
}

export default DynamicExample
```

### Summary

This documentation provided examples and explanations for using the `VerticalSplitter`, `HorizontalSplitter`, and `DynamicSplitter` components. These components enable flexible and resizable layouts, making it easier to manage complex user interfaces in your React application.
