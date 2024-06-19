'use client'
import { CSSProperties, useState, useRef } from 'react'
import { Checkbox, Group } from '@mantine/core'
import AmeCheckbox from '@/ui/checkbox/AmeCheckbox'
import Split from 'react-split'

const RunPage = () => {
    const [sizes, setSizes] = useState<number[]>([30, 30, 30])
    const gutters = useRef<HTMLDivElement[]>([])

    const panelStyle: CSSProperties = {
        padding: '4px'
    }

    const gutterStyle: CSSProperties = {
        backgroundColor: '#403f3f'
    }

    return (
        <div style={{ padding: 1 }}>
            <Split
                sizes={sizes}
                minSize={125}
                expandToMin={true}
                gutterSize={15}
                gutterAlign="center"
                snapOffset={10}
                dragInterval={1}
                direction="horizontal"
                cursor="col-resize"
                onDragEnd={(newSizes) => setSizes(newSizes)}
                style={{
                    display: 'flex',
                    height: 'calc(1000vh - 10px)'
                }}
                gutter={(index, direction) => {
                    const gutter = document.createElement('div')
                    gutter.style.cssText = `height: 100%; background-color: transparent; width: 30px; cursor: col-resize; position: relative;`

                    const innerGutter = document.createElement('div')
                    innerGutter.style.cssText = `height: 100%; background-color: #403f3f; width: 1px; position: absolute; left: 2.5px;`

                    gutter.appendChild(innerGutter)
                    gutters.current[index] = gutter

                    gutter.addEventListener('mouseenter', () => {
                        gutter.style.cursor = 'col-resize'
                    })
                    gutter.addEventListener('mouseleave', () => {
                        gutter.style.cursor = 'default'
                    })

                    return gutter
                }}
            >
                <div style={panelStyle}>
                    <p>This is the Cool App Page.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                        withAsterisk
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix" />
                            <AmeCheckbox value="autogen" label="Microsoft Autogen" />
                            <AmeCheckbox value="langchain" label="Langchain" />
                            <AmeCheckbox value="crewai" label="Crew AI" />
                            <AmeCheckbox value="ollama" label="Ollama" />
                            <AmeCheckbox value="unsloth" label="Unsloth" />
                        </Group>
                    </Checkbox.Group>
                </div>

                <div style={panelStyle}>
                    <p>This is a duplicate of the Cool App Page.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                        withAsterisk
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix" />
                            <AmeCheckbox value="autogen" label="Microsoft Autogen" />
                            <AmeCheckbox value="langchain" label="Langchain" />
                            <AmeCheckbox value="crewai" label="Crew AI" />
                            <AmeCheckbox value="ollama" label="Ollama" />
                            <AmeCheckbox value="unsloth" label="Unsloth" />
                        </Group>
                    </Checkbox.Group>
                </div>
                <div style={panelStyle}>
                    <p>This is a duplicate of the Cool App Page.</p>
                    <Checkbox.Group
                        defaultValue={['aimatrix']}
                        label="Select your favorite Artificial Intelligence Frameworks"
                        description="Choose one or more of the following options:"
                        withAsterisk
                    >
                        <Group mt="xs">
                            <AmeCheckbox value="aimatrix" label="AI Matrix" />
                            <AmeCheckbox value="autogen" label="Microsoft Autogen" />
                            <AmeCheckbox value="langchain" label="Langchain" />
                            <AmeCheckbox value="crewai" label="Crew AI" />
                            <AmeCheckbox value="ollama" label="Ollama" />
                            <AmeCheckbox value="unsloth" label="Unsloth" />
                        </Group>
                    </Checkbox.Group>
                </div>
            </Split>
        </div>
    )
}

export default RunPage
