# Color Scheme Management for AI Matrix Mantine UI

This document provides guidelines for managing color schemes in our React Next.js TypeScript application using Mantine. Our application supports both dark and light modes, and the proper use of color schemes is crucial.

The default color for our app will be DARK MODE so it's important that all developer tessting is done in dark mode.

## MantineProvider Configuration

MantineProvider manages the color scheme context in your application. You can set the default color scheme using the `defaultColorScheme` prop. Possible values are `light`, `dark`, and `auto` (which uses the system color scheme). The default value is `light`.

```typescript
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Color Scheme Attribute

When `MantineProvider` is mounted, it sets the `data-mantine-color-scheme` attribute on the `<html />` element based on the selected or default color scheme. This attribute determines the colors used by components.

## useMantineColorScheme Hook

The `useMantineColorScheme` hook provides methods to get and set the current color scheme.

```typescript
import { useMantineColorScheme, Button, Group } from '@mantine/core';

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
```

## useComputedColorScheme Hook

The `useComputedColorScheme` hook returns a computed color scheme value, either `light` or `dark`.

```typescript
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

function Demo() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };
}
```

## Transitions During Color Scheme Change

Transitions are disabled by default when changing color schemes to avoid inconsistent animations. To enable transitions, set `keepTransitions: true` in the `useMantineColorScheme` hook.

```typescript
import { useMantineColorScheme } from '@mantine/core';

function Demo() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
}
```

## Server-Side Rendering (SSR) Considerations

For SSR applications, avoid using the `colorScheme` value directly to prevent hydration issues. Use dark and light mixins from `postcss-preset-mantine` instead.

## ColorSchemeScript Component

The `ColorSchemeScript` component sets the `data-mantine-color-scheme` attribute on the `<html />` element before hydration, preventing flashes of inaccurate color schemes in SSR applications.

```typescript
import { ColorSchemeScript } from '@mantine/core';

function App() {
  return (
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Custom Color Scheme Manager

You can implement a custom color scheme manager to store the color scheme value in external storage.

```typescript
import {
  isMantineColorScheme,
  MantineColorScheme,
  MantineColorSchemeManager,
} from '@mantine/core';

export function localStorageColorSchemeManager({
  key = 'mantine-color-scheme',
}: LocalStorageColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  // Implementation here
}

const colorSchemeManager = localStorageColorSchemeManager({ key: 'my-color-scheme' });

function App() {
  return (
    <MantineProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Default and Forced Color Schemes

Set the default color scheme on both `MantineProvider` and `ColorSchemeScript`. To force a color scheme, use the `forceColorScheme` prop.

```typescript
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

function App() {
  return (
    <ColorSchemeScript defaultColorScheme="dark" />
    <MantineProvider defaultColorScheme="dark">
      {/* Your app here */}
    </MantineProvider>
  );
}
```

## Hidden Components Based on Color Scheme

Use `lightHidden` and `darkHidden` props to hide components based on the color scheme.

```typescript
import { Button } from '@mantine/core';

function Demo() {
  return (
    <>
      <Button color="cyan" lightHidden>
        Visible in dark color scheme only
      </Button>
      <Button color="pink" darkHidden>
        Visible in light color scheme only
      </Button>
    </>
  );
}
```

## Support for Disabled JavaScript

Set the `data-mantine-color-scheme` attribute manually in the `<html />` element for users with disabled JavaScript.

```typescript
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```
