'use client'

import { Button, Flex, Grid, Select } from '@mantine/core'
import { IconSquareRoundedPlus } from '@tabler/icons-react'
import { useState } from 'react'
import Prompt from '@/components/Prompt/Prompt'
import ResponsePlayground from '@/components/Playground/ResponsePlayground'
import PlaygroundRunForm from '@/components/Playground/PlaygroundRunForm'
import VerticalSplitter from '@/ui/split/VerticalSplitter'
import DynamicSplitter from '@/ui/split/DynamicSplitter'
import HorizontalSplitter from '@/ui/split/HorizontalSplitter'

const PlaygroundPage = () => {
    const [prompts, setPrompts] = useState([
        {
            type: 'System',
            value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eius ipsam omnis possimus sint vero voluptatem? Aut blanditiis debitis deserunt dignissimos dolore, dolores dolorum eos placeat porro quam unde velit?',
            id: 0
        },
        {
            type: 'User',
            value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eius ipsam omnis possimus sint vero voluptatem? Aut blanditiis debitis deserunt dignissimos dolore, dolores dolorum eos placeat porro quam unde velit?',
            id: 1
        }
    ])

    return (
        <>
            <Flex align={'center'} gap={12} mb={12}>
                <Select
                    placeholder="Pick a Version"
                    data={['Version 01', 'Version 02', 'Version 03', 'Version 04']}
                />
                <Button color="gray" size="xs">
                    Save Update
                </Button>
                <Button color="gray" size="xs">
                    Save New
                </Button>
                <Button color="gray" size="xs">
                    Clear
                </Button>
            </Flex>

            <VerticalSplitter initialSizes={[150, 250, 500, 200]} expandToMin={false}>
                <div>
                    <Flex direction={'column'} gap={12}>
                        <Button color="gray" size="xs" fullWidth>
                            Convert to Variable
                        </Button>
                        <Button color="gray" size="xs" fullWidth>
                            Make Section Optional
                        </Button>
                    </Flex>
                </div>
                <div>
                    <Flex direction={'column'} gap={12}>
                        {prompts.map((item) => (
                            <Prompt
                                type={item.type}
                                value={item.value}
                                key={item.id}
                                id={item.id}
                                remove={() => {
                                    const p = prompts.filter((a, b) => a.id !== item.id)
                                    setPrompts(p)
                                }}
                            />
                        ))}

                        <Button
                            color="gray"
                            size="xs"
                            fullWidth
                            leftSection={<IconSquareRoundedPlus width={14} />}
                            onClick={() => {
                                const newId =
                                    prompts.length > 0 ? prompts[prompts.length - 1].id + 1 : 1
                                setPrompts([
                                    ...prompts,
                                    { type: 'User', value: 'Bla bla bla', id: newId }
                                ])
                            }}
                        >
                            Add Prompt
                        </Button>
                    </Flex>
                </div>

                <div>
                    <ResponsePlayground />
                </div>
                <div>
                    <PlaygroundRunForm />
                </div>
            </VerticalSplitter>
        </>
    )
}

export default PlaygroundPage
