// ResponseTextArea.tsx
import React from 'react';
import { Grid, Text } from "@mantine/core";
import { GiArtificialHive } from "react-icons/gi";
import styles from '@/app/samples/stream-trials/nice-updated/interface/chat.module.css';
import MarkdownRenderer from '@/app/samples/stream-trials/nice-updated/Response/markdown/MarkdownRenderer';

const ResponseTextArea: React.FC<{ response: string }> = ({ response }) => {
    return (
        <Grid>
            <Grid.Col span={1} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <GiArtificialHive size={18} style={{ color: 'gray' }} />
            </Grid.Col>
            <Grid.Col span={11} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text className={styles.responseTextArea}>
                    <MarkdownRenderer content={response || 'Loading...'} />
                </Text>
            </Grid.Col>
        </Grid>
    );
};

export default ResponseTextArea;
