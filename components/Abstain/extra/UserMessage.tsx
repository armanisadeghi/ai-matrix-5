// /ai-chatbot/nice-working/response/UserMessage.tsx

import React from 'react';
import { Paper, ActionIcon, Grid, Text } from '@mantine/core';
import { LiaEditSolid } from "react-icons/lia";
import styles from "../../AiChat/Response/chat.module.css";


interface UserMessageProps {
    text: string;
}

const UserMessage: React.FC<UserMessageProps> = ({text}) => {

    return (
        <Paper p="md"  >
            <Grid>
                <Grid.Col span={1}></Grid.Col>
                <Grid.Col span="auto">
                    <Text style={{marginLeft: '150px'}}>
                        {text || "Loading..."}
                        <ActionIcon variant="light" size="md" aria-label="Edit Message">
                            <LiaEditSolid />
                        </ActionIcon>
                    </Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default UserMessage;
