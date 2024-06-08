import React from 'react';
import { Grid, Text } from '@mantine/core';
import { GiArtificialHive } from "react-icons/gi";
import styles from "./chat.module.css";
import MarkdownRenderer from "@/components/AiChat/Response/markdown/MarkdownRenderer";

interface AssistantMessageProps {
    text?: string;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ text }) => {

    if (!text) {
        return null;
    }

    return (
        <Grid>
            <Grid.Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <GiArtificialHive size={22} style={{ color: 'gray' }} />
            </Grid.Col>

            <Grid.Col span={10} style={{ display: 'flex', alignItems: 'center' }}>

                <Text className={styles.responseTextArea} style={{ marginLeft: '10px' }}>
                    <MarkdownRenderer content={text || 'Loading...'} />
                </Text>


            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
