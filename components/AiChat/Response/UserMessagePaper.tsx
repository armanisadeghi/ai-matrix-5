// UserMessagePaper.tsx

import React from 'react';
import { Grid, Paper, Text, ActionIcon } from "@mantine/core";
import styles from "./ResponseArea.module.css";
import { GrFormEdit } from "react-icons/gr";

const UserMessagePaper: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Paper p="md" className={styles.userMessagePaper}>
            <Grid>
                <Grid.Col span={1}>
                    <ActionIcon
                        className={styles.userEditActionIcon}
                        variant="transparent"
                        color="light"
                        size="xl"
                        aria-label="Edit Message"
                    >
                        <GrFormEdit />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={11}>
                    <Text className={styles.userMessage} style={{ whiteSpace: 'pre-wrap' }}>
                        {text}
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default UserMessagePaper;
