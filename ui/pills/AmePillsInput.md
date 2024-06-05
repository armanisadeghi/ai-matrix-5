### AmePillsInput Usage Sample:

```tsx
import AmePillsInput from '@/ui/input/AmePillsInput';

<div>
  <AmePillsInput
    initialPills={['Example']}
    placeholder="Type and press enter"
    label="Your Labels"
    description="Describe your field"
    renderPillContent={(item) => <span>{item}</span>}
    onPillsChange={(pills) => console.log(pills)}
  />
</div>
```

#### Required Props:
- `initialPills`: T[] - The initial list of pills to be displayed.
- `placeholder`: string - Placeholder text for the input field.
- `label`: string - The label for the input, displayed above it.
- `description`: string - A short description or guidance displayed under the label.
- `renderPillContent`: (item: T) => React.ReactNode - Function to render the content inside each pill.

#### Optional Props:
- `onPillsChange`: (pills: T[]) => void - Callback function that fires when there is a change in the pills array.

#### Default Features:
- **Dynamic Interaction**: Users can add a new pill by typing and pressing 'Enter'. Pills can be removed by clicking a remove button on each pill or by using 'Backspace'.
- **Customizable Pill Rendering**: The content of each pill can be customized through the `renderPillContent` function, allowing for diverse representations of pill data.
- **Accessibility and Usability**: Enhances usability through keyboard interactions and accessible design.
- **State Management**: Internal state management of pills with updates propagated via `onPillsChange` callback.
