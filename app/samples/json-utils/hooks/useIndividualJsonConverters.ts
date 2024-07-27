import { useMemo } from 'react';

type JsonValue = string | number | boolean | { [key: string]: JsonValue } | JsonValue[];

const toRoman = (num: number): string => {
    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return roman[num - 1] || num.toString();
};

const getOutlinePrefix = (depth: number, count: number): string => {
    if (depth === 0) return `${String.fromCharCode(65 + count)}. `;
    if (depth === 1) return `${count + 1}. `;
    if (depth === 2) return `${String.fromCharCode(97 + count)}. `;
    if (depth === 3) return `${toRoman(count + 1)}. `;
    return `${'- '.repeat(count + 1)}`;
};

const formatPythonValue = (val: any): string => {
    if (val === null) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'string') return `'${val.replace(/'/g, '\\\'')}'`;
    if (Array.isArray(val)) return `[${val.map(formatPythonValue).join(', ')}]`;
    if (typeof val === 'object') return parseObjectPythonDict(val, 0).pythonDict;
    return val.toString();
};

const parseObjectResult = (data: any, depth: number = 0, isRootArray: boolean = Array.isArray(data)): string => {
    let result = '';
    let count = 1;

    if (isRootArray) count = 0;

    Object.entries(data).forEach(([key, value]) => {
        const prefix = isRootArray ? '' : getOutlinePrefix(depth, count - (isRootArray ? 1 : 0));
        const indent = '   '.repeat(depth);

        if (typeof value === 'object' && value !== null) {
            result += `${indent}${prefix}**${key}**\n`;
            result += parseObjectResult(value, depth + 1);
        } else if (Array.isArray(value)) {
            result += `${indent}${prefix}**${key}**\n`;
            value.forEach(item => {
                result += parseObjectResult(item, depth + 1, true);
            });
        } else {
            const itemKey = isRootArray && depth === 0 ? '' : `${key}: `;
            result += `${indent}${prefix}${itemKey}${value}\n`;
        }
        count++;
    });

    return result;
};

const parseObjectTreeResult = (data: any, depth: number = 0): string => {
    let treeResult = '';
    const treeIndent = '│   '.repeat(Math.max(depth - 1, 0)) + (depth > 0 ? '├── ' : '');

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            treeResult += `${treeIndent}${key}\n`;
            treeResult += parseObjectTreeResult(value, depth + 1);
        } else if (Array.isArray(value)) {
            treeResult += `${treeIndent}${key}\n`;
            value.forEach(item => {
                treeResult += parseObjectTreeResult(item, depth + 1);
            });
        } else {
            treeResult += `${treeIndent}${key}: ${value}\n`;
        }
    });

    return treeResult;
};

const parseObjectMarkdown = (data: any, depth: number = 0): string => {
    let markdown = '';
    const indent = '  '.repeat(depth * 2);

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            markdown += `${indent}* **${key}**\n`;
            markdown += parseObjectMarkdown(value, depth + 1);
        } else if (Array.isArray(value)) {
            markdown += `${indent}* **${key}**\n`;
            value.forEach(item => {
                markdown += parseObjectMarkdown(item, depth + 1);
            });
        } else {
            markdown += `${indent}* **${key}**: ${value}\n`;
        }
    });

    return markdown;
};

const parseObjectPlainText = (data: any, depth: number = 0): string => {
    let plainText = '';
    const indent = ' '.repeat(depth * 2);

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            plainText += `${indent}${key}\n`;
            plainText += parseObjectPlainText(value, depth + 1);
        } else if (Array.isArray(value)) {
            plainText += `${indent}${key}\n`;
            value.forEach(item => {
                plainText += parseObjectPlainText(item, depth + 1);
            });
        } else {
            plainText += `${indent}${key}: ${value}\n`;
        }
    });

    return plainText;
};

const parseObjectPythonDict = (data: any, depth: number = 0): { pythonDict: string } => {
    let pythonDict = '';
    const indent = '   '.repeat(depth);

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            pythonDict += `${indent}'${key}': {\n`;
            pythonDict += parseObjectPythonDict(value, depth + 1).pythonDict;
            pythonDict += `${indent}},\n`;
        } else if (Array.isArray(value)) {
            pythonDict += `${indent}'${key}': [\n`;
            value.forEach(item => {
                pythonDict += parseObjectPythonDict(item, depth + 1).pythonDict;
            });
            pythonDict += `${indent}],\n`;
        } else {
            pythonDict += `${indent}'${key}': ${formatPythonValue(value)},\n`;
        }
    });

    return { pythonDict };
};

type JsonToOutlineResultWithoutRunAll = Omit<JsonToOutlineResult, 'runAll'>;

interface JsonToOutlineResult {
    outlineText: string;
    treeText: string;
    markdownText: string;
    plainText: string;
    pythonDictionaryText: string;
    runAll: () => JsonToOutlineResultWithoutRunAll;
}

const useJsonToOutline = (json: string): JsonToOutlineResult => {
    const parsedJson = useMemo(() => {
        try {
            return JSON.parse(json || '[]');
        } catch {
            return {};
        }
    }, [json]);

    const outlineText = useMemo(() => parseObjectResult(parsedJson, 0, Array.isArray(parsedJson)), [parsedJson]);
    const treeText = useMemo(() => parseObjectTreeResult(parsedJson), [parsedJson]);
    const markdownText = useMemo(() => parseObjectMarkdown(parsedJson), [parsedJson]);
    const plainText = useMemo(() => parseObjectPlainText(parsedJson), [parsedJson]);
    const pythonDictionaryText = useMemo(() => `{${parseObjectPythonDict(parsedJson).pythonDict}}`, [parsedJson]);

    const runAll = (): JsonToOutlineResultWithoutRunAll => ({
        outlineText: parseObjectResult(parsedJson, 0, Array.isArray(parsedJson)),
        treeText: parseObjectTreeResult(parsedJson),
        markdownText: parseObjectMarkdown(parsedJson),
        plainText: parseObjectPlainText(parsedJson),
        pythonDictionaryText: `{${parseObjectPythonDict(parsedJson).pythonDict}}`,
    });

    return { outlineText, treeText, markdownText, plainText, pythonDictionaryText, runAll };
};

export default useJsonToOutline;
