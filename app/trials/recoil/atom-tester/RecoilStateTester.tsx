import AmeJsonInput from '@/ui/json/AmeJsonInput';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, RecoilValue, RecoilState } from 'recoil';
import { Textarea, TextInput, JsonInput, Button, Stack, Box, Group } from '@mantine/core';
import { SettingsAtomsTester } from './SettingsAtomsTester';
import { AtomName } from '@/state/aiAtoms/settingsAtoms';

type ViewType = 'json' | 'textarea' | 'textinput';

interface BaseStateItem {
    name: string;
    viewType: ViewType;
}

interface AtomStateItem extends BaseStateItem {
    type: 'atom';
    atom: RecoilState<any>;
}

interface AtomFamilyStateItem extends BaseStateItem {
    type: 'atomFamily';
    atom: (param: any) => RecoilState<any>;
}

interface SelectorStateItem extends BaseStateItem {
    type: 'selector';
    selector: RecoilValue<any>;
    fetcher?: () => Promise<any>;
}

interface SettingsStateItem extends BaseStateItem {
    type: 'settings';
    atomNames: AtomName[];
}

export type StateItem = AtomStateItem | AtomFamilyStateItem | SelectorStateItem | SettingsStateItem;

interface RecoilStateTesterProps {
    items: StateItem[];
}

const StateViewer: React.FC<{ atom: RecoilState<any>; viewType: ViewType }> = ({ atom, viewType }) => {
    const [atomValue, setAtomValue] = useRecoilState(atom);
    const [localValue, setLocalValue] = useState(JSON.stringify(atomValue, null, 2));
    const [error, setError] = useState<string | undefined>(undefined);

    const handleChange = (newValue: string) => {
        setLocalValue(newValue);
        setError(undefined);
    };

    const handleUpdate = () => {
        try {
            const parsedValue = JSON.parse(localValue);
            setAtomValue(parsedValue);
            setError(undefined);
        } catch (error) {
            console.error('Invalid JSON:', error);
            setError('Invalid JSON');
        }
    };

    const renderInput = () => {
        const commonProps = {
            value: localValue,
            onChange: handleChange,
            style: { flex: 1, minHeight: '100px' },
            autosize: true,
            minRows: 3,
        };

        switch (viewType) {
            case 'json':
                return (
                    <AmeJsonInput
                        {...commonProps}
                        errorMessage={error}
                        validateJson={true}
                    />
                );
            case 'textarea':
                return <Textarea {...commonProps} onChange={(e) => handleChange(e.currentTarget.value)} />;
            case 'textinput':
                return <TextInput {...commonProps} onChange={(e) => handleChange(e.currentTarget.value)} />;
            default:
                return null;
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {renderInput()}
            <Button onClick={handleUpdate} mt="sm">Update Atom</Button>
        </Box>
    );
};

const AtomFamilyViewer: React.FC<{ atom: (param: any) => RecoilState<any>, viewType: ViewType }> = ({ atom, viewType }) => {
    const [param, setParam] = useState('');
    const [currentParam, setCurrentParam] = useState('');
    const [atomValue, setAtomValue] = useRecoilState(atom(currentParam));
    const [localValue, setLocalValue] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (atomValue !== undefined) {
            setLocalValue(JSON.stringify(atomValue, null, 2));
        }
    }, [atomValue, currentParam]);

    const handleParamChange = (newParam: string) => {
        setParam(newParam);
    };

    const handleSetParam = () => {
        setCurrentParam(param);
    };

    const handleValueChange = (newValue: string) => {
        setLocalValue(newValue);
        setError(undefined);
    };

    const handleUpdate = () => {
        try {
            const parsedValue = JSON.parse(localValue);
            setAtomValue(parsedValue);
            setError(undefined);
        } catch (error) {
            console.error('Invalid JSON:', error);
            setError('Invalid JSON');
        }
    };

    const renderInput = () => {
        const commonProps = {
            value: localValue,
            onChange: handleValueChange,
            style: { flex: 1, minHeight: '100px' },
            autosize: true,
            minRows: 3,
        };

        switch (viewType) {
            case 'json':
                return (
                    <AmeJsonInput
                        {...commonProps}
                        errorMessage={error}
                        validateJson={true}
                    />
                );
            case 'textarea':
                return <Textarea {...commonProps} onChange={(e) => handleValueChange(e.currentTarget.value)} />;
            case 'textinput':
                return <TextInput {...commonProps} onChange={(e) => handleValueChange(e.currentTarget.value)} />;
            default:
                return null;
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Group mb="sm">
                <TextInput
                    value={param}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleParamChange(e.currentTarget.value)}
                    placeholder="Enter atom family parameter"
                    style={{ flex: 1 }}
                />
                <Button onClick={handleSetParam}>Set Parameter</Button>
            </Group>
            {renderInput()}
            <Group mt="sm">
                <Button onClick={handleUpdate}>Update Atom</Button>
                <TextInput
                    value={currentParam}
                    readOnly
                    placeholder="Current parameter"
                    style={{ flex: 1 }}
                />
            </Group>
        </Box>
    );
};

const SelectorViewer: React.FC<{ selector: RecoilValue<any>, fetcher?: () => Promise<any>, viewType: ViewType }> = ({ selector, fetcher, viewType }) => {
    const [, forceUpdate] = useState({});
    const value = useRecoilValue(selector);

    const handleFetch = async () => {
        if (fetcher) {
            await fetcher();
            forceUpdate({});
        }
    };

    const renderInput = () => {
        const commonProps = {
            value: JSON.stringify(value, null, 2),
            readOnly: true,
            style: { flex: 1, minHeight: '100px' },
            autosize: true,
            minRows: 3,
        };

        switch (viewType) {
            case 'json':
                return <AmeJsonInput {...commonProps} enabled={true} />;
            case 'textarea':
                return <Textarea {...commonProps} />;
            case 'textinput':
                return <TextInput {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {fetcher && <Button onClick={handleFetch} mb="sm">Fetch Data</Button>}
            {renderInput()}
        </Box>
    );
};

export const RecoilStateTester: React.FC<RecoilStateTesterProps> = ({ items }) => {
    return (
        <>
            {items.map((item, index) => {
                let content;

                switch (item.type) {
                    case 'atom':
                        content = <StateViewer atom={item.atom} viewType={item.viewType} />;
                        break;
                    case 'atomFamily':
                        content = <AtomFamilyViewer atom={item.atom} viewType={item.viewType} />;
                        break;
                    case 'selector':
                        content = <SelectorViewer selector={item.selector} fetcher={item.fetcher} viewType={item.viewType} />;
                        break;
                    case 'settings':
                        content = <SettingsAtomsTester atomNames={item.atomNames} />;
                        break;
                }

                return (
                    <Box key={index} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {content}
                    </Box>
                );
            })}
        </>
    );
};
