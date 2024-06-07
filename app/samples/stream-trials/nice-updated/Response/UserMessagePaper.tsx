// UserMessagePaper.tsx

import React from 'react';
import { Grid, Paper, Text, ActionIcon } from "@mantine/core";
import { LiaEditSolid } from "react-icons/lia";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '@/app/samples/stream-trials/nice-updated/interface/chat.module.css';
import renderers from '@/app/samples/stream-trials/nice-updated/Response/markdown/renderers';

const UserMessagePaper: React.FC<{ userMessage: string }> = ({ userMessage }) => {
    return (
        <Paper p="md" className={styles.userMessagePaper}>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text className={styles.userMessage}>
                        <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]} components={renderers}>
                            {userMessage}
                        </ReactMarkdown>
                        <ActionIcon
                            className={styles.actionIcon}
                            variant="transparent"
                            color="dark"
                            size="sm"
                            aria-label="Edit Message"
                        >
                            <LiaEditSolid />
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default UserMessagePaper;
