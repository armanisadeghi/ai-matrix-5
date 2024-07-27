import React, { forwardRef } from 'react';
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { Container, Box, Stack, Paper, Text } from '@mantine/core';

const Messages = forwardRef<HTMLDivElement, Record<never, never>>((props, ref) => {
  const { messages } = useVoice();

  return (
      <Box ref={ref} style={{ flexGrow: 1, overflowY: 'auto',  borderRadius: '8px' }}>
        <Container size="md" style={{ paddingBottom: '96px' }}>
          <Stack gap="md">
            {messages.map((msg, index) => {
              if (msg.type === "user_message" || msg.type === "assistant_message") {
                return (
                    <Paper key={msg.type + index} shadow="xs" p="md">
                      <Text fw={500}>{msg.message.role}</Text>
                      <Text>{msg.message.content}</Text>
                      <Expressions values={msg.models.prosody?.scores ?? {}} />
                    </Paper>
                );
              }
              return null;
            })}
          </Stack>
        </Container>
      </Box>
  );
});

export default Messages;
