import React, { useState, ChangeEvent } from 'react'
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
    RecoilState,
    RecoilValueReadOnly
} from 'recoil'
import { Group, Button, Select, Input, JsonInput } from '@mantine/core'
import * as chatAtomsDbNew from '@/hooks/ai/chatAtomsDbNew'

const atomSelectorMap = {
    chatIdsAtom: chatAtomsDbNew.chatIdsAtom,
    chatAtomFamily: chatAtomsDbNew.chatAtomFamily,
    userChatsSelector: chatAtomsDbNew.userChatsSelector,
    chatSelector: chatAtomsDbNew.chatSelector,
    systemMessagesAtom: chatAtomsDbNew.systemMessagesAtom,
    activeUserAtom: chatAtomsDbNew.activeUserAtom,
    availableHeightSelector: chatAtomsDbNew.availableHeightSelector,
    availableWidthSelector: chatAtomsDbNew.availableWidthSelector
}

const AtomTester: React.FC = () => {
    const [selectedAtomKey, setSelectedAtomKey] = useState<string>('')
    const [atomValue, setAtomValue] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')

    // Dynamic atom and selector handlers
    const atom = atomSelectorMap[selectedAtomKey] as RecoilState<any> | RecoilValueReadOnly<any>
    const [stateValue, setStateValue] = useRecoilState(atom)
    const setValue = useSetRecoilState(atom)

    const handleSelectAtom = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAtomKey(event.currentTarget.value)
    }

    const handleSetValue = () => {
        setValue(JSON.parse(inputValue))
    }

    const handleGetValue = () => {
        setAtomValue(JSON.stringify(stateValue, null, 2)) // Enhanced JSON output for readability
    }

    return (
        <div>
            <Group gap="xs">
                <Select
                    label="Select an Atom/Selector"
                    placeholder="Pick an atom or selector"
                    data={Object.keys(atomSelectorMap)}
                    value={selectedAtomKey}
                    onChange={handleSelectAtom}
                />
                <Button onClick={handleSetValue}>Set Value</Button>
                <Button onClick={handleGetValue}>Get Value</Button>
            </Group>
            <Group>
                <JsonInput
                    label="Current Atom/Selector Value"
                    autosize
                    minRows={4}
                    value={atomValue}
                    onChange={(event) => setAtomValue(event.currentTarget.value)}
                />
                <Input
                    placeholder="Enter new value for the atom"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.currentTarget.value)}
                />
            </Group>
        </div>
    )
}

export default AtomTester
