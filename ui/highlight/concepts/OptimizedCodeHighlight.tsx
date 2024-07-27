import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, BoxProps, StylesApiProps } from '@mantine/core';
import hljs from 'highlight.js'; // Assuming Mantine uses highlight.js

interface OptimizedCodeHighlightProps extends BoxProps, StylesApiProps<any> {
    code: string;
    language: string;
}

const OptimizedCodeHighlight: React.FC<OptimizedCodeHighlightProps> = ({
                                                                           code,
                                                                           language,
                                                                           ...others
                                                                       }) => {
    const [highlightedChunks, setHighlightedChunks] = useState<string[]>([]);
    const codeRef = useRef(code);
    const chunkRef = useRef<string[]>([]);

    const highlightChunk = useCallback((chunk: string) => {
        const highlighted = hljs.highlight(chunk, { language }).value;
        return highlighted;
    }, [language]);

    useEffect(() => {
        if (code !== codeRef.current) {
            const newChunk = code.slice(codeRef.current.length);
            const highlightedNewChunk = highlightChunk(newChunk);
            chunkRef.current.push(highlightedNewChunk);
            setHighlightedChunks([...chunkRef.current]);
            codeRef.current = code;
        }
    }, [code, highlightChunk]);

    return (
        <Box {...others}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightedChunks.join('') }} />
      </pre>
        </Box>
    );
};

export default OptimizedCodeHighlight;
