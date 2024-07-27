import { useState } from 'react';
import { Filter, BaseFilter, StartsWithFilter, EndsWithFilter, ContainsFilter, RegexFilter, ExactMatchFilter, WordCountFilter, LengthBetweenFilter, ContainsDigitsFilter, ContainsSpecialCharsFilter, IsUppercaseFilter, IsLowercaseFilter, ContainsSubstringFilter } from '@/app/trials/text-classification/types';

export const useFilters = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    const [currentFilter, setCurrentFilter] = useState<Filter | null>(null);

    const createNewFilter = (metric: string): Filter => {
        const baseFilter: BaseFilter = {
            id: Date.now().toString(),
            metric,
            text: '',
            color: '#ecc76d',
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

    return {
        filters,
        currentFilter,
        setCurrentFilter,
        createNewFilter,
        handleSave,
        handleDelete
    };
};
