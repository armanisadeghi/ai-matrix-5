'use client';

import {Button, Collapse, Flex, Grid, Group, Paper, Select, Text, Textarea} from "@mantine/core";
import {
    IconArrowsDiagonal,
    IconArrowsDiagonalMinimize2,
    IconUpload,
    IconSquareRoundedPlus,
    IconSquareRoundedArrowLeft,
    IconTrash, IconChevronRight, IconChevronDown
} from '@tabler/icons-react'
import {useDisclosure} from "@mantine/hooks";

const PlaygroundPage = () => {
    const [opened, {toggle}] = useDisclosure(false);

    return (
        <>
            <Flex align={'center'} gap={12}>
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
            <Flex>

            </Flex>
            <Grid mt={24} gutter={16}>
                <Grid.Col span={2} style={{
                    borderRight: '1px solid gray',
                }}>
                    <Flex direction={'column'} gap={12}>
                        <Button color="gray" size="xs" fullWidth>
                            Convert to Variable
                        </Button>
                        <Button color="gray" size="xs" fullWidth>
                            Make Section Optional
                        </Button>
                    </Flex>

                </Grid.Col>
                <Grid.Col span={2}
                          style={{
                    borderRight: '1px solid gray',
                }}>
                    <Flex direction={'column'} gap={12}>
                        <Paper withBorder p="md">
                            <Flex align={'center'} justify={'space-between'}>
                                <Text size={'xs'}>System</Text>
                                <IconArrowsDiagonal width={16}/>
                            </Flex>

                            <Textarea autosize={true} variant="unstyled" size={'xs'} value={'Your prompt'}>
                            </Textarea>
                        </Paper>

                        <Paper withBorder p="md">
                            <Flex align={'center'} justify={'space-between'}>
                                <Text size={'xs'}>User</Text>
                                <Group>
                                    <IconUpload width={16}/>
                                    <IconArrowsDiagonalMinimize2 width={16}/>
                                </Group>
                            </Flex>

                            <Textarea autosize={true} variant="unstyled" size={'xs'} value={'Your prompt'}>
                            </Textarea>
                        </Paper>

                        <Button color="gray" size="xs" fullWidth leftSection={<IconSquareRoundedPlus width={14}/>}>
                            Add Prompt
                        </Button>
                    </Flex>
                </Grid.Col>

                <Grid.Col span={5} style={{
                    borderRight: '1px solid gray',
                }}>
                    <Paper withBorder p="md">
                        <Flex align={'center'} justify={'space-between'}>
                            <Text size={'xs'}>Response 1</Text>
                            <Group>
                                <IconTrash width={16}/>
                                <IconArrowsDiagonalMinimize2 width={16}/>
                            </Group>
                        </Flex>

                        <Textarea autosize={true} variant="unstyled" size={'xs'}
                                  value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa dolorum eveniet illo in itaque molestiae nemo, quae reiciendis rem? Beatae dolorum expedita illum ipsa optio quidem reiciendis, temporibus tenetur?'}/>
                        <Flex justify={'space-between'} mt={24}>
                            <Select
                                size={'xs'}
                                placeholder="Pick a type"
                                data={['Text', 'Markdown', 'Form', 'Table', 'JSON']}
                                defaultValue='Text'
                            />


                            <Flex gap={8}>
                                <Button color="gray" size="xs" leftSection={<IconSquareRoundedArrowLeft width={14}/>}>
                                    Move
                                </Button>
                                <Button color="gray" size="xs">
                                    Clean
                                </Button>
                                <Button color="gray" size="xs">
                                    Test
                                </Button>
                            </Flex>
                        </Flex>

                    </Paper>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button color="gray" size="xs" fullWidth>
                        Run test
                    </Button>
                    <Flex align={'center'} mt={24} justify={'flex-start'} onClick={toggle} style={{cursor: 'pointer'}}>
                        <Text size={'sm'}>
                            Model 1
                        </Text>
                        {opened ? <IconChevronDown width={16}/> : <IconChevronRight width={16}/>}


                    </Flex>


                    <Collapse in={opened} mb={24}>
                        <Select
                            mt={12}
                            size={'xs'}
                            placeholder="Select Provider"
                            data={['OpenAI', 'Google']}
                        />


                        <Select
                            mt={12}
                            size={'xs'}
                            placeholder="Pick a type"
                            data={['Text', 'Markdown', 'Form', 'Table', 'JSON']}
                            disabled={true}
                        />

                        <Flex align={'center'} mt={24} justify={'flex-start'} style={{cursor: 'pointer'}}>
                            <Text size={'xs'}>
                                Advanced options
                            </Text>
                            <IconChevronRight width={16}/>


                        </Flex>


                    </Collapse>
                    <Button color="gray" size="xs" fullWidth mt={24}>
                        Add model
                    </Button>
                </Grid.Col>
            </Grid>

        </>
    )
}

export default PlaygroundPage