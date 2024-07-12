import MarkdownRendererFast from '@/components/AiChat/Response/markdown/tests/MarkdownNew/MarkdownRendererFast';
import ResponseSaveRow from '@/components/AiChat/Response/ResponseSaveRow/ActionButtonRow';
import React, { useRef } from 'react';
import { Grid, Space } from '@mantine/core';
import { GiArtificialHive } from 'react-icons/gi';
import styles from './ResponseArea.module.css';
import MarkdownRenderer from './markdown/MarkdownRenderer';


interface AssistantMessageProps {
    text?: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({text}) => {
    const textRef = useRef<string | null>(null);

    if (!text) {
        return null;
    }

    // Update the ref value
    textRef.current = text;

    return (
        <Grid>
            <Grid.Col span={0.6}>
                <GiArtificialHive size={22} style={{color: 'gray'}}/>
            </Grid.Col>

            <Grid.Col span={11.4}>
                <div className={styles.assistantResponseText}>
                    {/*<MarkdownRenderer content={text} />*/}
                    <MarkdownRendererFast content={text}/>
                    <Space h="xs"/>
                    <ResponseSaveRow textRef={textRef}/>
                </div>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
