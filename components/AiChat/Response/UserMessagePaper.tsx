// UserMessagePaper.tsx
import React from 'react';
import { Grid, Paper, Text, ActionIcon } from "@mantine/core";
import { LiaEditSolid } from "react-icons/lia";
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from "./ResponseArea.module.css";
import renderers from './markdown/renderers';
import { GrFormEdit } from "react-icons/gr";

const UserMessagePaper: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Paper p="md" className={styles.userMessagePaper}>
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text className={styles.userMessage}>
                        <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkGfm]} components={renderers as Components}>
                            {text}
                        </ReactMarkdown>
                        <ActionIcon
                            className={styles.actionIcon}
                            variant="transparent"
                            color="dark"
                            size="sm"
                            aria-label="Edit Message"
                        >
                            <GrFormEdit />
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default UserMessagePaper;
