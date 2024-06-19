# IconWrapper React Component

The IconWrapper component is a versatile React component designed to wrap and style icons or any other content. It provides options for customizing the size and visual style (variant) of the wrapped content, making it flexible for various design needs.

## Key Features

1. **Content Wrapping**: The component accepts any valid React node as its child, allowing you to wrap icons, text, or other elements.

2. **Size Customization**: Offers the ability to adjust the size of the wrapped content through the `size` prop. This prop is optional and can take predefined size values from the Mantine library.

3. **Variant Styling**: Supports different visual styles through the `variant` prop. This prop is optional and allows you to select from various predefined theme variants from the ThemeIcon component in Mantine.

## Usage Example

```tsx
import React from 'react';
import IconWrapper from './IconWrapper';
import { IconHome } from '@tabler/icons';

function App() {
  return (
    <div>
      <h1>Icon Wrapper Example</h1>
      <AmeIconWrapper size="lg" variant="filled">
        <IconHome />
      </AmeIconWrapper>
    </div>
  );
}

export default App;
```

## Props

- **children** (ReactNode): The content to be wrapped, typically an icon or any other React element.
- **size** (MantineSize): Optional. Defines the size of the wrapped content. Accepts values from the Mantine size options (e.g., 'xs', 'sm', 'md', 'lg', 'xl').
- **variant** (ThemeIconProps["variant"]): Optional. Specifies the visual style of the wrapper. Accepts values corresponding to the ThemeIcon variants in Mantine (e.g., 'filled', 'outline', 'light'). 