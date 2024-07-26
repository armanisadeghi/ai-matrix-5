import React, { useRef } from 'react';
import { Grid, Space } from '@mantine/core';
import { GiArtificialHive } from 'react-icons/gi';
import styles from './ResponseArea.module.css';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import ResponseSaveRow from '@/components/AiChat/Response/ResponseSaveRow';

interface AssistantMessageProps {
    text?: string;
    stream?: boolean; // Added the stream prop
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ text, stream = false }) => { // Set default value of stream to false
    const textRef = useRef<string | null>(null);

    if (!text) {
        return null;
    }
    textRef.current = text;

    return (
        <Grid>
            <Grid.Col span={0.6}>
                <GiArtificialHive size={22} style={{color: 'gray'}}/>
            </Grid.Col>

            <Grid.Col span={11.4}>
                <div className={styles.assistantResponseText}>
                    <MarkdownRenderer content={text}/>
                    <Space h="xs"/>
                    {!stream && <ResponseSaveRow textRef={textRef}/>} {/* Conditionally render ResponseSaveRow */}
                </div>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
