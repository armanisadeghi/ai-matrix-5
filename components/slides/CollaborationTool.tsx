// components/slides/CollaborationTool.tsx

"use client";

import { Avatar, Button, Group, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconMessage, IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";

interface Collaborator {
    id: string;
    name: string;
    email: string;
}

export default function CollaborationTool() {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");

    const addCollaborator = () => {
        if (newCollaboratorEmail) {
            const newCollaborator: Collaborator = {
                id: Date.now().toString(),
                name: newCollaboratorEmail.split("@")[0], // Simple name extraction
                email: newCollaboratorEmail,
            };
            setCollaborators([...collaborators, newCollaborator]);
            setNewCollaboratorEmail("");
        }
    };

    const addComment = () => {
        if (newComment) {
            setComments([...comments, newComment]);
            setNewComment("");
        }
    };

    return (
        <Stack>
            <Paper shadow="xs" p="md">
                <Text fw={500} size="lg" mb="md">
                    Collaborators
                </Text>
                <Group mb="md">
                    <TextInput
                        placeholder="Enter collaborator's email"
                        value={newCollaboratorEmail}
                        onChange={(event) => setNewCollaboratorEmail(event.currentTarget.value)}
                        style={{ flex: 1 }}
                    />
                    <Button onClick={addCollaborator} leftSection={<IconUserPlus size={14} />}>
                        Add Collaborator
                    </Button>
                </Group>
                {collaborators.map((collaborator) => (
                    <Group key={collaborator.id} mb="xs">
                        <Avatar color="blue" radius="xl">
                            {collaborator.name[0].toUpperCase()}
                        </Avatar>
                        <div>
                            <Text>{collaborator.name}</Text>
                            <Text size="xs" color="dimmed">
                                {collaborator.email}
                            </Text>
                        </div>
                    </Group>
                ))}
            </Paper>

            <Paper shadow="xs" p="md">
                <Text fw={500} size="lg" mb="md">
                    Comments
                </Text>
                <Group mb="md">
                    <TextInput
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(event) => setNewComment(event.currentTarget.value)}
                        style={{ flex: 1 }}
                    />
                    <Button onClick={addComment} leftSection={<IconMessage size={14} />}>
                        Add Comment
                    </Button>
                </Group>
                {comments.map((comment, index) => (
                    <Text key={index} mb="xs">
                        {comment}
                    </Text>
                ))}
            </Paper>
        </Stack>
    );
}
