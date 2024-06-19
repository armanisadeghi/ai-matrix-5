import { useState } from 'react'
import { Flex, Group, Paper, rem, Text, Textarea } from '@mantine/core'
import {
    IconArrowsDiagonal,
    IconArrowsDiagonalMinimize2,
    IconPhoto,
    IconTrash,
    IconUpload,
    IconX
} from '@tabler/icons-react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

type Prompt = {
    type: string
    value: string
    id: number
    remove: any
}
const Prompt = ({ type, value, id, remove }: Prompt) => {
    const [minimize, setMinimize] = useState(true)
    const [isDrop, setIsDrop] = useState(false)

    return (
        <Paper withBorder p="md">
            <Flex align={'center'} justify={'space-between'}>
                <Text size={'xs'} fw={600}>
                    {type}
                </Text>
                <Flex gap={8}>
                    {type === 'User' && (
                        <IconUpload
                            width={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsDrop(!isDrop)}
                        />
                    )}
                    {!minimize ? (
                        <IconArrowsDiagonalMinimize2
                            width={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setMinimize(!minimize)}
                        />
                    ) : (
                        <IconArrowsDiagonal
                            width={16}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setMinimize(!minimize)}
                        />
                    )}
                    {id > 1 && (
                        <IconTrash width={16} style={{ cursor: 'pointer' }} onClick={remove} />
                    )}
                </Flex>
            </Flex>
            {isDrop ? (
                <Dropzone
                    onDrop={(files) => console.log('accepted files', files)}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: 'var(--mantine-color-blue-6)'
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: 'var(--mantine-color-red-6)'
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: 'var(--mantine-color-dimmed)'
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>

                        <div>
                            <Text size="sm" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="xs" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            ) : minimize ? (
                <div style={{ maxHeight: 80, overflow: 'hidden' }}>
                    <Text size={'xs'} onClick={() => setMinimize(false)}>
                        {value}
                    </Text>
                </div>
            ) : (
                <Textarea autosize={true} variant="unstyled" size={'xs'} defaultValue={value} />
            )}
        </Paper>
    )
}

export default Prompt
