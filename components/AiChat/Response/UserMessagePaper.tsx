// UserMessagePaper.tsx

import React from "react";
import { Grid, Paper, Text, ActionIcon, Flex } from "@mantine/core";
import styles from "./ResponseArea.module.css";
import { GrFormEdit } from "react-icons/gr";

const UserMessagePaper: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Paper p="sm" className={styles.userMessagePaper}>
            <Flex align="center">
                <ActionIcon
                    className={styles.userEditActionIcon}
                    variant="transparent"
                    color="light"
                    size="xl"
                    aria-label="Edit Message"
                >
                    <GrFormEdit />
                </ActionIcon>

                <span className={styles.userMessage}>
                    {text}
                </span>
            </Flex>
        </Paper>
    );
};

export default UserMessagePaper;
