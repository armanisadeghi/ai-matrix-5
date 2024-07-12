'use client';

import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Select, Textarea, Space } from '@mantine/core';
import { useFilters } from '@/app/trials/text-classification/hooks/useFilters';
import { FilterSettings } from './FilterSettings';
import { SavedFiltersTable } from './SavedFiltersTable';
import { hasCaseSensitiveProperty } from '@/app/trials/text-classification/types';

const FilterComponent: React.FC = () => {
    const { filters, currentFilter, setCurrentFilter, createNewFilter, handleSave, handleDelete } = useFilters();
    const [testText, setTestText] = useState<string>('');
    const [highlightedText, setHighlightedText] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const applyFilters = () => {
            const lines = testText.split('\n');
            const newHighlightedText = lines.map((line, lineIndex) => {
                let lineElement = <span key={`line-${lineIndex}`}>{line}</span>;
                let lineMatches = false;

                filters.forEach((filter) => {
                    let match = false;
                    let matchedText = '';

                    switch (filter.metric) {
                        case 'starts_with':
                        case 'ends_with':
                        case 'contains':
                        case 'regex':
                        case 'exact_match':
                        case 'contains_substring':
                            if (hasCaseSensitiveProperty(filter)) {
                                const regex = new RegExp(filter.text, filter.case_sensitive ? '' : 'i');
                                match = regex.test(line);
                                matchedText = filter.text;
                            }
                            break;
                        case 'word_count':
                        case 'length_between':
                        case 'contains_digits':
                        case 'contains_special_chars':
                        case 'is_uppercase':
                        case 'is_lowercase':
                            // These are handled separately if necessary
                            break;
                    }

                    if (match) {
                        lineMatches = true;
                        const parts = line.split(matchedText);
                        lineElement = (
                            <span key={`line-${lineIndex}`}>
                                {parts.map((part, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && <span style={{ backgroundColor: filter.color }}>{matchedText}</span>}
                                        {part}
                                    </React.Fragment>
                                ))}
                            </span>
                        );
                    }
                });

                return (
                    <div key={lineIndex} style={{ backgroundColor: lineMatches ? 'rgba(128, 128, 128, 0.1)' : 'transparent' }}>
                        {lineElement}
                    </div>
                );
            });

            setHighlightedText(newHighlightedText);
        };

        applyFilters();
    }, [filters, testText]);

    return (
        <Container size="lg">
            <h3>Text Classification</h3>
            <Space h="md" />
            <Paper shadow="sm" p="md" withBorder mt="md">
                <Textarea
                    label="Enter text to test (one line per entry)"
                    placeholder="Enter text here..."
                    value={testText}
                    onChange={(event) => setTestText(event.currentTarget.value)}
                    minRows={5}
                    maxRows={10}
                />
                <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                    {highlightedText}
                </div>
            </Paper>
            <Select
                label="Select Metric"
                placeholder="Pick one"
                value={currentFilter?.metric || null}
                onChange={(value) => value && setCurrentFilter(createNewFilter(value))}
                data={[
                    { value: 'starts_with', label: 'Starts With' },
                    { value: 'ends_with', label: 'Ends With' },
                    { value: 'contains', label: 'Contains' },
                    { value: 'regex', label: 'Regular Expression' },
                    { value: 'exact_match', label: 'Exact Match' },
                    { value: 'word_count', label: 'Word Count' },
                    { value: 'length_between', label: 'Length Between' },
                    { value: 'contains_digits', label: 'Contains Digits' },
                    { value: 'contains_special_chars', label: 'Contains Special Characters' },
                    { value: 'is_uppercase', label: 'Is Uppercase' },
                    { value: 'is_lowercase', label: 'Is Lowercase' },
                    { value: 'contains_substring', label: 'Contains Substring' },
                ]}
            />
            <FilterSettings
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                handleSave={handleSave}
            />
            <Title order={2} mt="xl">Saved Filters</Title>
            <SavedFiltersTable filters={filters} onDelete={handleDelete} />
        </Container>
    );
};

export default FilterComponent;
