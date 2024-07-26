// components/audio/AudioLibraryManager.tsx

'use client';

import React, { useState } from 'react';
import { Table, Button, Modal, TextInput, Group } from '@mantine/core';
import { IconTrash, IconPencil, IconPlus } from '@tabler/icons-react';

interface AudioTrack {
    id: string;
    title: string;
    artist: string;
    duration: string;
}

export default function AudioLibraryManager() {
    const [tracks, setTracks] = useState<AudioTrack[]>([
        { id: '1', title: 'Song 1', artist: 'Artist 1', duration: '3:45' },
        { id: '2', title: 'Song 2', artist: 'Artist 2', duration: '4:20' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

    const openModal = (track?: AudioTrack) => {
        setCurrentTrack(track || { id: '', title: '', artist: '', duration: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTrack(null);
    };

    const handleSave = () => {
        if (currentTrack) {
            if (currentTrack.id) {
                setTracks(tracks.map(t => t.id === currentTrack.id ? currentTrack : t));
            } else {
                setTracks([...tracks, { ...currentTrack, id: Date.now().toString() }]);
            }
        }
        closeModal();
    };

    const handleDelete = (id: string) => {
        setTracks(tracks.filter(t => t.id !== id));
    };

    return (
        <>
            <Button onClick={() => openModal()} leftSection={<IconPlus size={14} />} mb="md">
                Add Track
            </Button>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Artist</Table.Th>
                        <Table.Th>Duration</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {tracks.map((track) => (
                        <Table.Tr key={track.id}>
                            <Table.Td>{track.title}</Table.Td>
                            <Table.Td>{track.artist}</Table.Td>
                            <Table.Td>{track.duration}</Table.Td>
                            <Table.Td>
                                <Group>
                                    <Button onClick={() => openModal(track)} variant="outline" size="xs">
                                        <IconPencil size={14} />
                                    </Button>
                                    <Button onClick={() => handleDelete(track.id)} color="red" variant="outline" size="xs">
                                        <IconTrash size={14} />
                                    </Button>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Modal opened={isModalOpen} onClose={closeModal} title={currentTrack?.id ? 'Edit Track' : 'Add Track'}>
                <TextInput
                    label="Title"
                    value={currentTrack?.title || ''}
                    onChange={(e) => setCurrentTrack({ ...currentTrack!, title: e.target.value })}
                    mb="sm"
                />
                <TextInput
                    label="Artist"
                    value={currentTrack?.artist || ''}
                    onChange={(e) => setCurrentTrack({ ...currentTrack!, artist: e.target.value })}
                    mb="sm"
                />
                <TextInput
                    label="Duration"
                    value={currentTrack?.duration || ''}
                    onChange={(e) => setCurrentTrack({ ...currentTrack!, duration: e.target.value })}
                    mb="md"
                />
                <Button onClick={handleSave}>Save</Button>
            </Modal>
        </>
    );
}
