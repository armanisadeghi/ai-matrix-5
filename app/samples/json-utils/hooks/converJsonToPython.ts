import { useMemo } from 'react';

type JsonValue = string | number | boolean | { [key: string]: JsonValue } | JsonValue[];

const cleanJsonString = (json: string): string => {
    return json.replace(/[\r\n\t]/g, ' ').replace(/[^\x20-\x7E]+/g, '');
};

const formatPythonValue = (val: any): string => {
    if (val === null) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'string') return `'${val.replace(/'/g, '\\\'')}'`;
    if (Array.isArray(val)) return `[${val.map(formatPythonValue).join(', ')}]`;
    if (typeof val === 'object') return parseObjectPythonDict(val, 0).pythonDict;
    return val.toString();
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

interface JsonToPythonResult {
    pythonDictionaryText: string;
}

const useJsonToPython = (json: string): JsonToPythonResult => {
    const cleanedJson = useMemo(() => cleanJsonString(json), [json]);

    const parsedJson = useMemo(() => {
        try {
            return JSON.parse(cleanedJson || '[]');
        } catch {
            return {};
        }
    }, [cleanedJson]);

    const pythonDictionaryText = useMemo(() => `{${parseObjectPythonDict(parsedJson).pythonDict}}`, [parsedJson]);

    return { pythonDictionaryText };
};

export default useJsonToPython;
