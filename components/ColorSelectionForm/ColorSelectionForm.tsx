// components/ColorSelectionForm/ColorSelectionForm.tsx

import React from 'react';
import { PaperProps } from '@mantine/core';
import { ColorSelectionFormClient } from './ColorSelectionFormClient';

interface ColorSelectionFormProps extends PaperProps {}

export function ColorSelectionForm(props: ColorSelectionFormProps) {
    return <ColorSelectionFormClient {...props} />;
}
