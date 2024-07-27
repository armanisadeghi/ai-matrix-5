import { Textarea } from '@mantine/core';
import React from 'react';


export default function TopSection() {
    return (
        <Textarea
            placeholder="Enter your request or question here..."
            autosize
            minRows={2}
            maxRows={8}
        >
        </Textarea>
    );
}
