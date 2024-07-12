export interface BaseFilter {
    id: string;
    metric: string;
    text: string;
    color: string;
}

export interface StartsWithFilter extends BaseFilter {
    case_sensitive: boolean;
    strip: boolean;
}

export interface EndsWithFilter extends BaseFilter {
    case_sensitive: boolean;
    strip: boolean;
}

export interface ContainsFilter extends BaseFilter {
    case_sensitive: boolean;
    whole_word: boolean;
}

export interface RegexFilter extends BaseFilter {
    pattern: string;
    case_sensitive: boolean;
}

export interface ExactMatchFilter extends BaseFilter {
    case_sensitive: boolean;
}

export interface WordCountFilter extends BaseFilter {
    min_words: number;
    max_words: number;
}

export interface LengthBetweenFilter extends BaseFilter {
    min_length: number;
    max_length: number;
}

export interface ContainsDigitsFilter extends BaseFilter {
    minimum_digits: number;
}

export interface ContainsSpecialCharsFilter extends BaseFilter {
    minimum_special_chars: number;
}

export interface IsUppercaseFilter extends BaseFilter {
    minimum_uppercase_chars: number;
}

export interface IsLowercaseFilter extends BaseFilter {
    minimum_lowercase_chars: number;
}

export interface ContainsSubstringFilter extends BaseFilter {
    substring: string;
    case_sensitive: boolean;
}

export type Filter = StartsWithFilter | EndsWithFilter | ContainsFilter | RegexFilter | ExactMatchFilter |
    WordCountFilter | LengthBetweenFilter | ContainsDigitsFilter | ContainsSpecialCharsFilter |
    IsUppercaseFilter | IsLowercaseFilter | ContainsSubstringFilter;

export function hasCaseSensitiveProperty(filter: Filter): filter is StartsWithFilter | EndsWithFilter | ContainsFilter | RegexFilter | ExactMatchFilter | ContainsSubstringFilter {
    return 'case_sensitive' in filter;
}
