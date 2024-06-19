# Layout Management with Context Providers

## Overview

This documentation outlines the layout management approach using React context providers for different parts of the layout, namely the Navbar, Sidebar, Header, and Footer. This approach facilitates loosely coupled providers, allowing easy overrides of initial states in nested or child layouts.

## Setup and Usage

### Creating Context Providers

First, we need to create context providers for each part of the layout: `NavbarProvider`, `SidebarProvider`, `HeaderProvider`, and `FooterProvider`. Each provider will manage its respective state and provide it to the rest of the application.

### Using Providers in Main Layout

In the main layout component, we can wrap our application with these context providers to manage the state of each layout part:

<details>
<summary>
Here's an example of how you might set up these context providers:
</summary>
<p>

```tsx
// layouts/MainLayout.tsx
import { NavbarProvider } from '@/context/NavbarContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { HeaderProvider } from '@/context/HeaderContext'
import { FooterProvider } from '@/context/FooterContext'

const MainLayout = ({ children }) => {
    return (
        <NavbarProvider initialState="icons">
            <SidebarProvider initialAsideState="icons">
                <HeaderProvider initialState="medium">
                    <FooterProvider initialState="hidden">{children}</FooterProvider>
                </HeaderProvider>
            </SidebarProvider>
        </NavbarProvider>
    )
}

export default MainLayout
```

</p>
</details>

### Overriding Provider States in Child Layouts

One of the main advantages of using context providers is the ability to override their initial states in child layouts. This allows for highly customizable and flexible layout structures.

Here's an example of how to override the `NavbarProvider` state in a child layout:

```tsx
// app/dashboard/user/layout.tsx
'use client'

import { ReactNode } from 'react'
import { NavbarProvider } from '@/context/NavbarContext'

type Props = {
    children: ReactNode
}

export default function UserLayout({ children }: Props) {
    return <NavbarProvider initialState="expanded">{children}</NavbarProvider>
}
```

In this example, the `NavbarProvider` is overridden with an `initialState` of `"expanded"`, different from the `"icons"` state set in the main layout.

## Benefits

-   **Loose Coupling**: Each part of the layout is managed independently, making the codebase more modular and maintainable.
-   **Flexibility**: Allows for easy customization of the layout in different parts of the application by simply overriding context states.
-   **Scalability**: New layout parts can be added with minimal changes to the existing structure.
-   **Consistency**: Ensures consistent state management across the application while allowing for exceptions when necessary.

## Conclusion

By using React Context Providers to manage the different parts of the layout in a Next.js v14 application, you can create a robust, flexible, and maintainable layout structure. This approach allows for easy overrides in child layouts, making it ideal for complex applications that require dynamic layout management.

Feel free to extend this pattern as needed to fit the specific requirements of your application.
