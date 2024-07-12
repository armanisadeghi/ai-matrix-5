'use client';

import { leftSidebarAtom } from '@/state/layoutAtoms';
import AmeMultiSelect from '@/ui/select/AmeMultiSelect/AmeMultiSelect';
import React, { useEffect, useState } from 'react';
import { Grid, Space, Button, Textarea } from '@mantine/core';
import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { useRecoilState } from 'recoil';
import useJsonToOutline from './hooks/useIndividualJsonConverters';

const cleanJsonFunction = (json: string) => {
    try {
        return JSON.stringify(JSON.parse(json.replace(/\\r\\n|\\n|\\r/g, ' ')), null, 2);
    } catch (error) {
        console.error('Failed to clean JSON:', error);
        return null;
    }
};

const repairJson = (json: string) => {
    try {
        return JSON.stringify(JSON.parse(json.replace(/\\r\\n|\\n|\\r/g, ' ')), null, 2);
    } catch (error) {
        console.error('Failed to repair JSON:', error);
        return null;
    }
};

const conversionOptions = [
    { value: 'all', label: 'All' },
    { value: 'outlineText', label: 'Outline Text' },
    { value: 'treeText', label: 'Tree Structure' },
    { value: 'markdownText', label: 'Markdown Text' },
    { value: 'plainText', label: 'Plain Text' },
    { value: 'pythonDictionaryText', label: 'Python Dictionary' },
];

const Page: React.FC = () => {
    const [inputJson, setInputJson] = useState('');
    const [cleanJson, setCleanJson] = useState('');
    const [pythonDictionary, setPythonDictionary] = useState('');
    const [repairedJson, setRepairedJson] = useState('');
    const [leftSidebarWidth, setLeftSidebarWidth] = useRecoilState(leftSidebarAtom);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const { outlineText, treeText, markdownText, plainText, pythonDictionaryText, runAll } = useJsonToOutline(inputJson);

    const processJson = (json: string) => {
        const cleaned = cleanJsonFunction(json);
        const repaired = repairJson(json);

        if (cleaned) setCleanJson(cleaned);
        if (repaired) setRepairedJson(repaired);

        setPythonDictionary(pythonDictionaryText);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newJson = event.target.value;
        setInputJson(newJson);
        processJson(newJson);
    };

    useEffect(() => {
        setLeftSidebarWidth(0);
    }, [setLeftSidebarWidth]);

    const handleConvert = () => {
        if (selectedOptions.includes('all') || selectedOptions.length === 0) {
            const results = runAll();
            setPythonDictionary(results.pythonDictionaryText);
            setCleanJson(cleanJsonFunction(inputJson) || '');
            setRepairedJson(repairJson(inputJson) || '');
        } else {
            if (selectedOptions.includes('outlineText')) setPythonDictionary(outlineText);
            if (selectedOptions.includes('treeText')) setPythonDictionary(treeText);
            if (selectedOptions.includes('markdownText')) setPythonDictionary(markdownText);
            if (selectedOptions.includes('plainText')) setPythonDictionary(plainText);
            if (selectedOptions.includes('pythonDictionaryText')) setPythonDictionary(pythonDictionaryText);
        }
    };

    const clearAll = () => {
        setInputJson('');
        setCleanJson('');
        setPythonDictionary('');
        setRepairedJson('');
    };

    return (
        <Grid style={{ padding: '20px 20px' }}>
            <Grid.Col span={12} style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                <h4 style={{ margin: 0 }}>JSON Converter</h4>
                <AmeMultiSelect
                    data={conversionOptions}
                    placeholder="Select conversion options"
                    nothingFoundMessage="No options"
                    value={selectedOptions}
                    onChange={(values: string[]) => setSelectedOptions(values.includes('all') ? ['all'] : values)}
                />
                <Button onClick={handleConvert}>Convert</Button>
                <Button onClick={clearAll}>Clear All</Button>
            </Grid.Col>
            <Grid.Col span={2.5}>
                <Textarea label="Current Form Values" value={inputJson} onChange={handleInputChange} autosize minRows={3} />
            </Grid.Col>
            <Grid.Col span={4.75}>
                <Grid>
                    <Grid.Col span={12}><AmeJsonInput label="Clean Json" value={cleanJson} /></Grid.Col>
                    <Grid.Col span={12}><Textarea autosize minRows={6} label="Outline Text" value={outlineText} /></Grid.Col>
                    <Grid.Col span={12}><AmeJsonInput label="Repaired JSON" value={repairedJson} /></Grid.Col>
                    <Grid.Col span={12}><Textarea label="Outline Text" value={outlineText} autosize minRows={6} /></Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={4.75}>
                <Grid>
                    <Grid.Col span={12}><Textarea autosize minRows={6} label="Python Dictionary" value={pythonDictionary} /></Grid.Col>
                    <Grid.Col span={12}><Textarea label="Tree Structure" value={treeText} autosize minRows={6} /></Grid.Col>
                    <Grid.Col span={12}><Textarea label="Markdown Text" value={markdownText} autosize minRows={6} /></Grid.Col>
                    <Grid.Col span={12}><Textarea label="Plain Text" value={plainText} autosize minRows={6} /></Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>
    );
};

export default Page;
