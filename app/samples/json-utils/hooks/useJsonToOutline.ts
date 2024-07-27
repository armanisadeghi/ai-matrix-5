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

const parseObject = (data: any, depth: number = 0, isRootArray: boolean = Array.isArray(data)) => {
    let result = '';
    let treeResult = '';
    let markdown = '';
    let plainText = '';
    let pythonDict = '';
    let count = 1;

    if (isRootArray) count = 0;

    Object.entries(data).forEach(([key, value]) => {
        const prefix = isRootArray ? '' : getOutlinePrefix(depth, count - (isRootArray ? 1 : 0));
        const indent = '   '.repeat(depth);
        const treeIndent = '│   '.repeat(Math.max(depth - 1, 0)) + (depth > 0 ? '├── ' : '');
        const plainIndent = ' '.repeat(depth * 2);
        const itemKey = isRootArray && depth === 0 ? '' : `${key}: `;

        //@ts-ignore
        const formatPythonValue = (val: any) => {
            if (val === null) return 'None';
            if (typeof val === 'boolean') return val ? 'True' : 'False';
            if (typeof val === 'string') return `'${val.replace(/'/g, '\\\'')}'`;
            if (Array.isArray(val)) return `[${val.map(formatPythonValue).join(', ')}]`;
            if (typeof val === 'object') return parseObject(val, depth + 1).pythonDict;
            return val;
        };

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            result += `${indent}${prefix}**${key}**\n`;
            treeResult += `${treeIndent}${key}\n`;
            markdown += `${'  '.repeat(depth * 2)}* **${key}**\n`;
            plainText += `${plainIndent}${key}\n`;
            pythonDict += `${indent}'${key}': {\n`;
            const nested = parseObject(value, depth + 1);
            result += nested.result;
            treeResult += nested.treeResult;
            markdown += nested.markdown;
            plainText += nested.plainText;
            pythonDict += nested.pythonDict + indent + '},\n';
        } else if (Array.isArray(value)) {
            result += `${indent}${prefix}**${key}**\n`;
            treeResult += `${treeIndent}${key}\n`;
            markdown += `${'  '.repeat(depth * 2)}* **${key}**\n`;
            plainText += `${plainIndent}${key}\n`;
            pythonDict += `${indent}'${key}': [\n`;
            value.forEach((item) => {
                const nested = parseObject(item, depth + 1, true);
                result += nested.result;
                treeResult += nested.treeResult;
                markdown += nested.markdown;
                plainText += nested.plainText;
                pythonDict += nested.pythonDict;
            });
            pythonDict += indent + '],\n';
        } else {
            const pythonValue = formatPythonValue(value);
            result += `${indent}${prefix}${itemKey}${value}\n`;
            treeResult += `${treeIndent}${itemKey}${value}\n`;
            markdown += `${'  '.repeat(depth * 2)}* **${itemKey}**: ${value}\n`;
            plainText += `${plainIndent}${itemKey}${value}\n`;
            pythonDict += `${indent}'${key}': ${pythonValue},\n`;
        }
        count++;
    });

    return {result, treeResult, markdown, plainText, pythonDict};
};

const useJsonToOutline = (json: string) => {
    const parsedJson = useMemo(() => {
        try {
            return JSON.parse(json || '[]');
        }
        catch {
            return {};
        }
    }, [json]);

    const outlineText = useMemo(() => parseObject(parsedJson).result, [parsedJson]);
    const treeText = useMemo(() => parseObject(parsedJson).treeResult, [parsedJson]);
    const markdownText = useMemo(() => parseObject(parsedJson).markdown, [parsedJson]);
    const plainText = useMemo(() => parseObject(parsedJson).plainText, [parsedJson]);
    const pythonDictionaryText = useMemo(() => `{${parseObject(parsedJson).pythonDict}}`, [parsedJson]);

    return {outlineText, treeText, markdownText, plainText, pythonDictionaryText};
};

export default useJsonToOutline;
