// components/slides/TemplateLibrary.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { SimpleGrid, Card, Image, Text, Button, Modal } from '@mantine/core';

interface Template {
    id: string;
    name: string;
    thumbnailUrl: string;
}

export default function TemplateLibrary() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        // Replace this with actual API call to fetch templates
        const mockTemplates: Template[] = [
            { id: '1', name: 'Business Presentation', thumbnailUrl: '/templates/business.jpg' },
            { id: '2', name: 'Creative Portfolio', thumbnailUrl: '/templates/creative.jpg' },
            { id: '3', name: 'Educational Slides', thumbnailUrl: '/templates/education.jpg' },
            // Add more mock templates as needed
        ];
        setTemplates(mockTemplates);
    };

    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        setModalOpen(true);
    };

    const handleUseTemplate = () => {
        // Here you would implement the logic to use the selected template
        console.log('Using template:', selectedTemplate?.name);
        setModalOpen(false);
    };

    return (
        <>
            <SimpleGrid cols={3} spacing="md">
                {templates.map((template) => (
                    <Card key={template.id} shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image src={template.thumbnailUrl} height={160} alt={template.name} />
                        </Card.Section>
                        <Text mt="md" mb="xs" fw={500}>
                            {template.name}
                        </Text>
                        <Button onClick={() => handleTemplateSelect(template)} fullWidth mt="md" radius="md">
                            Use Template
                        </Button>
                    </Card>
                ))}
            </SimpleGrid>

            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Template Selection">
                <Text>Are you sure you want to use the "{selectedTemplate?.name}" template?</Text>
                <Button onClick={handleUseTemplate} mt="md">
                    Use Template
                </Button>
            </Modal>
        </>
    );
}
