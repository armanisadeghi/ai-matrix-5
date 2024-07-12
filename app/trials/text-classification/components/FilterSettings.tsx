import React from 'react';
import { Paper, Switch, NumberInput, Title, Button, TextInput, Stack, ColorInput } from '@mantine/core';
import { hasCaseSensitiveProperty } from '@/app/trials/text-classification/types';
import { ContainsDigitsFilter, ContainsFilter, ContainsSpecialCharsFilter, ContainsSubstringFilter, EndsWithFilter, Filter, IsLowercaseFilter, IsUppercaseFilter, LengthBetweenFilter, RegexFilter, StartsWithFilter, WordCountFilter } from '@/app/trials/text-classification/types';

interface FilterSettingsProps {
    currentFilter: Filter | null;
    setCurrentFilter: (filter: Filter | null) => void;
    handleSave: () => void;
}

export const FilterSettings: React.FC<FilterSettingsProps> = ({ currentFilter, setCurrentFilter, handleSave }) => {
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
                {hasCaseSensitiveProperty(currentFilter) && (
                    <Switch
                        label="Case Sensitive"
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
