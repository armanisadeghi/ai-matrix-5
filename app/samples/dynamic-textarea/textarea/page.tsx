'use client';
import React from 'react';
import { ScrollArea, Textarea } from "@mantine/core";

const TextPage = () => {
    return (
        <ScrollArea>
            <Textarea
                placeholder="Type here..."
                autosize
            />
        </ScrollArea>
    );
};

export default TextPage;
