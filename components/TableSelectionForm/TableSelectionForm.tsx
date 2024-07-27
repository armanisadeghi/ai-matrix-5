// components/TableSelectionForm/TableSelectionForm.tsx

import React from 'react';
import AmePaper from "@/ui/surfaces/AmePaper";
import { PaperProps } from "@mantine/core";
import { TableSelectionFormClient } from './TableSelectionFormClient';

interface TableSelectionFormProps extends PaperProps {}

export function TableSelectionForm({ ...others }: TableSelectionFormProps) {
    return (
        <AmePaper component="form" py="md" {...others}>
            <TableSelectionFormClient />
        </AmePaper>
    );
}
