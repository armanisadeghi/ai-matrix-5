'use client';
import React, { useState, useEffect } from 'react';
import { Container, Paper, Switch, NumberInput, Title, Group, Button, TextInput, Stack, Select, Textarea, Table, ColorInput, Space } from '@mantine/core';

interface BaseFilter {
    id: string;
    metric: string;
    text: string;
    color: string;
}

interface StartsWithFilter extends BaseFilter {
    case_sensitive: boolean;
    strip: boolean;
}

interface EndsWithFilter extends BaseFilter {
    case_sensitive: boolean;
    strip: boolean;
}

interface ContainsFilter extends BaseFilter {
    case_sensitive: boolean;
    whole_word: boolean;
}

interface RegexFilter extends BaseFilter {
    pattern: string;
    case_sensitive: boolean;
}

interface ExactMatchFilter extends BaseFilter {
    case_sensitive: boolean;
}

interface WordCountFilter extends BaseFilter {
    min_words: number;
    max_words: number;
}

interface LengthBetweenFilter extends BaseFilter {
    min_length: number;
    max_length: number;
}

interface ContainsDigitsFilter extends BaseFilter {
    minimum_digits: number;
}

interface ContainsSpecialCharsFilter extends BaseFilter {
    minimum_special_chars: number;
}

interface IsUppercaseFilter extends BaseFilter {
    minimum_uppercase_chars: number;
}

interface IsLowercaseFilter extends BaseFilter {
    minimum_lowercase_chars: number;
}

interface ContainsSubstringFilter extends BaseFilter {
    substring: string;
    case_sensitive: boolean;
}

type Filter = StartsWithFilter | EndsWithFilter | ContainsFilter | RegexFilter | ExactMatchFilter |
    WordCountFilter | LengthBetweenFilter | ContainsDigitsFilter | ContainsSpecialCharsFilter |
    IsUppercaseFilter | IsLowercaseFilter | ContainsSubstringFilter;

const FilterSettings: React.FC<{
    currentFilter: Filter | null;
    setCurrentFilter: (filter: Filter | null) => void;
    handleSave: () => void;
}> = ({ currentFilter, setCurrentFilter, handleSave }) => {
    if (!currentFilter) return null;

    const handleChange = (key: string, value: any) => {
        setCurrentFilter({ ...currentFilter, [key]: value });
    };

    return (
        <Paper shadow="sm" p="md" withBorder mt="md">
            <Title order={3}>{currentFilter.metric}</Title>
            <Stack gap="xs">
                {['starts_with', 'ends_with', 'contains', 'exact_match', 'contains_substring'].includes(currentFilter.metric) && (
                    <TextInput
                        label="Text to Filter"
                        value={currentFilter.text}
                        onChange={(e) => handleChange('text', e.currentTarget.value)}
                    />
                )}
                <ColorInput
                    label="Highlight Color"
                    value={currentFilter.color}
                    onChange={(color) => handleChange('color', color)}
                />
                {['starts_with', 'ends_with', 'contains', 'regex', 'exact_match', 'contains_substring'].includes(currentFilter.metric) && (
                    <Switch
                        label="Case Sensitive"
                        //@ts-ignore
                        checked={currentFilter.case_sensitive}
                        onChange={(e) => handleChange('case_sensitive', e.currentTarget.checked)}
                    />
                )}
                {['starts_with', 'ends_with'].includes(currentFilter.metric) && (
                    <Switch
                        label="Strip"
                        checked={(currentFilter as StartsWithFilter | EndsWithFilter).strip}
                        onChange={(e) => handleChange('strip', e.currentTarget.checked)}
                    />
                )}
                {currentFilter.metric === 'contains' && (
                    <Switch
                        label="Whole Word"
                        checked={(currentFilter as ContainsFilter).whole_word}
                        onChange={(e) => handleChange('whole_word', e.currentTarget.checked)}
                    />
                )}
                {currentFilter.metric === 'regex' && (
                    <TextInput
                        label="Regex Pattern"
                        value={(currentFilter as RegexFilter).pattern}
                        onChange={(e) => handleChange('pattern', e.currentTarget.value)}
                    />
                )}
                {currentFilter.metric === 'word_count' && (
                    <>
                        <NumberInput
                            label="Minimum Words"
                            value={(currentFilter as WordCountFilter).min_words}
                            onChange={(value) => handleChange('min_words', value)}
                            min={0}
                        />
                        <NumberInput
                            label="Maximum Words"
                            value={(currentFilter as WordCountFilter).max_words}
                            onChange={(value) => handleChange('max_words', value)}
                            min={0}
                        />
                    </>
                )}
                {currentFilter.metric === 'length_between' && (
                    <>
                        <NumberInput
                            label="Minimum Length"
                            value={(currentFilter as LengthBetweenFilter).min_length}
                            onChange={(value) => handleChange('min_length', value)}
                            min={0}
                        />
                        <NumberInput
                            label="Maximum Length"
                            value={(currentFilter as LengthBetweenFilter).max_length}
                            onChange={(value) => handleChange('max_length', value)}
                            min={0}
                        />
                    </>
                )}
                {currentFilter.metric === 'contains_digits' && (
                    <NumberInput
                        label="Minimum Digits"
                        value={(currentFilter as ContainsDigitsFilter).minimum_digits}
                        onChange={(value) => handleChange('minimum_digits', value)}
                        min={0}
                    />
                )}
                {currentFilter.metric === 'contains_special_chars' && (
                    <NumberInput
                        label="Minimum Special Characters"
                        value={(currentFilter as ContainsSpecialCharsFilter).minimum_special_chars}
                        onChange={(value) => handleChange('minimum_special_chars', value)}
                        min={0}
                    />
                )}
                {currentFilter.metric === 'is_uppercase' && (
                    <NumberInput
                        label="Minimum Uppercase Characters"
                        value={(currentFilter as IsUppercaseFilter).minimum_uppercase_chars}
                        onChange={(value) => handleChange('minimum_uppercase_chars', value)}
                        min={0}
                    />
                )}
                {currentFilter.metric === 'is_lowercase' && (
                    <NumberInput
                        label="Minimum Lowercase Characters"
                        value={(currentFilter as IsLowercaseFilter).minimum_lowercase_chars}
                        onChange={(value) => handleChange('minimum_lowercase_chars', value)}
                        min={0}
                    />
                )}
                {currentFilter.metric === 'contains_substring' && (
                    <TextInput
                        label="Substring"
                        value={(currentFilter as ContainsSubstringFilter).substring}
                        onChange={(e) => handleChange('substring', e.currentTarget.value)}
                    />
                )}
            </Stack>
            <Button fullWidth mt="md" onClick={handleSave}>
                Save Filter
            </Button>
        </Paper>
    );
};

const SavedFiltersTable: React.FC<{ filters: Filter[], onDelete: (id: string) => void }> = ({ filters, onDelete }) => (
    <Table>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Metric</Table.Th>
                <Table.Th>Text</Table.Th>
                <Table.Th>Color</Table.Th>
                <Table.Th>Settings</Table.Th>
                <Table.Th>Actions</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {filters.map((filter) => (
                <Table.Tr key={filter.id}>
                    <Table.Td>{filter.metric}</Table.Td>
                    <Table.Td>{filter.text}</Table.Td>
                    <Table.Td>
                        <div style={{ width: 20, height: 20, backgroundColor: filter.color, border: '1px solid black' }} />
                    </Table.Td>
                    <Table.Td>
                        {Object.entries(filter).map(([key, value]) => {
                            if (['id', 'metric', 'text', 'color'].includes(key)) return null;
                            return <div key={key}>{`${key}: ${value}`}</div>;
                        })}
                    </Table.Td>
                    <Table.Td>
                        <Button color="red" onClick={() => onDelete(filter.id)}>Delete</Button>
                    </Table.Td>
                </Table.Tr>
            ))}
        </Table.Tbody>
    </Table>
);

const FilterComponent: React.FC = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [currentFilter, setCurrentFilter] = useState<Filter | null>(null);
    const [testText, setTestText] = useState<string>('');
    const [highlightedText, setHighlightedText] = useState<JSX.Element[]>([]);

    const createNewFilter = (metric: string): Filter => {
        const baseFilter: BaseFilter = {
            id: Date.now().toString(),
            metric,
            text: '',
            color: '#FFFF00',
        };

        switch (metric) {
            case 'starts_with':
            case 'ends_with':
                return { ...baseFilter, case_sensitive: false, strip: false } as StartsWithFilter | EndsWithFilter;
            case 'contains':
                return { ...baseFilter, case_sensitive: false, whole_word: false } as ContainsFilter;
            case 'regex':
                return { ...baseFilter, pattern: '', case_sensitive: false } as RegexFilter;
            case 'exact_match':
                return { ...baseFilter, case_sensitive: false } as ExactMatchFilter;
            case 'word_count':
                return { ...baseFilter, min_words: 0, max_words: Infinity } as WordCountFilter;
            case 'length_between':
                return { ...baseFilter, min_length: 0, max_length: Infinity } as LengthBetweenFilter;
            case 'contains_digits':
                return { ...baseFilter, minimum_digits: 1 } as ContainsDigitsFilter;
            case 'contains_special_chars':
                return { ...baseFilter, minimum_special_chars: 1 } as ContainsSpecialCharsFilter;
            case 'is_uppercase':
                return { ...baseFilter, minimum_uppercase_chars: 1 } as IsUppercaseFilter;
            case 'is_lowercase':
                return { ...baseFilter, minimum_lowercase_chars: 1 } as IsLowercaseFilter;
            case 'contains_substring':
                return { ...baseFilter, substring: '', case_sensitive: false } as ContainsSubstringFilter;
            default:
                throw new Error(`Unknown metric: ${metric}`);
        }
    };

    const handleSave = () => {
        if (!currentFilter) return;
        const existingFilterIndex = filters.findIndex(f => f.id === currentFilter.id);
        if (existingFilterIndex >= 0) {
            setFilters(filters.map((f, i) => i === existingFilterIndex ? currentFilter : f));
        } else {
            setFilters([...filters, currentFilter]);
        }
        setCurrentFilter(null);
    };

    const handleDelete = (id: string) => {
        setFilters(filters.filter(f => f.id !== id));
    };

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
                            //@ts-ignore
                            const regex = new RegExp(filter.text, filter.case_sensitive ? '' : 'i');
                            match = regex.test(line);
                            matchedText = filter.text;
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
