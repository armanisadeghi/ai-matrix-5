### AmeSlider Usage Sample:

```tsx
import AmeSlider from '@/ui/slider/AmeSlider';

<div>
  <AmeSlider
    name="Example Slider"
    tooltip="Adjust the value"
    min={0}
    max={100}
    step={5}
  />
</div>
```

#### Required Props:
- `name`: string - The label for the slider, displayed above it.

#### Optional Props:
- `tooltip`: string - Additional information shown on hover or as part of the slider label.
- `min`: number - Minimum value for the slider. Default is `0`.
- `max`: number - Maximum value for the slider. Default is `10`.
- `step`: number - Step increment of the slider. Default is `1`.

#### Default Features:
- **Dynamic Marks**: Marks appear at the start, middle, and end based on `min` and `max` values.
- **Bidirectional Binding**: The numeric input and slider values are synchronized.
- **Formatting**: Displays values with tooltips and formatted labels.
- **Customization**: Accepts custom `min`, `max`, and `step` values to fit a range of uses.

