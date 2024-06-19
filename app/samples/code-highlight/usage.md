# AmeCodeHighlight and AmeCodeTabs Components Documentation

## Overview

The `AmeCodeHighlight` and `AmeCodeTabs` components are designed to provide a consistent and flexible way to display code snippets in our application. They support various features such as code highlighting, optional loading effects, and expand/collapse functionality.

## AmeCodeHighlight

### Description

`AmeCodeHighlight` is used to display individual code snippets with optional loading effects and expand/collapse functionality.

### Props

-   `code` (string) - **Required**: The code to be highlighted.
-   `language` (string) - **Required**: The programming language of the code snippet.
-   `title` (string) - **Required**: The title or filename to display for the code snippet.
-   `startCollapsed` (boolean) - Optional: If true, the code snippet starts in a collapsed state. Default is `false`.
-   `useLoadingEffect` (boolean) - Optional: If true, a loading effect is shown before displaying the code. Default is `false`.

### Sample Usage

```tsx
import AmeCodeHighlight from '@/ui/highlight/AmeCodeHighlight'

const codeSnippet = `console.log('Hello, world!');`
const language = 'javascript'
const title = 'Example.js'

const ExampleComponent = () => {
    return (
        <AmeCodeHighlight
            code={codeSnippet}
            language={language}
            title={title}
            startCollapsed={false}
            useLoadingEffect={true}
        />
    )
}

export default ExampleComponent
```

## AmeCodeTabs

### Description

`AmeCodeTabs` is used to display multiple code snippets within tabs, with optional loading effects and expand/collapse functionality.

### Props

-   `codeSnippets` (array) - **Required**: An array of objects containing the code snippets to be displayed. Each object should have the following structure:
    -   `code` (string) - **Required**: The code to be highlighted.
    -   `language` (string) - **Required**: The programming language of the code snippet.
    -   `title` (string) - **Required**: The title or filename to display for the code snippet.
-   `startCollapsed` (boolean) - Optional: If true, the code snippets start in a collapsed state. Default is `false`.
-   `useLoadingEffect` (boolean) - Optional: If true, a loading effect is shown before displaying the code. Default is `false`.

### Sample Usage

```tsx
import AmeCodeTabs from '@/ui/highlight/AmeCodeTabs'

const codeSnippets = [
    { code: `console.log('Hello, TypeScript!');`, language: 'typescript', title: 'Example.ts' },
    { code: `body { margin: 0; }`, language: 'css', title: 'Example.css' },
    { code: `print('Hello, Python!')`, language: 'python', title: 'Example.py' }
]

const ExampleTabsComponent = () => {
    return (
        <AmeCodeTabs codeSnippets={codeSnippets} startCollapsed={false} useLoadingEffect={true} />
    )
}

export default ExampleTabsComponent
```

## Notes

-   Ensure that the CSS file `AmeCodeHighlight.module.css` is included in the project to maintain consistent styling.
-   The `useLoadingEffect` prop can be used to provide a better user experience when loading large code snippets or when the initial load time is significant.
-   The `startCollapsed` prop is useful when you want to display code snippets in a more compact form initially and allow users to expand them as needed.

By following this documentation, developers should be able to effectively use the `AmeCodeHighlight` and `AmeCodeTabs` components in their projects.
