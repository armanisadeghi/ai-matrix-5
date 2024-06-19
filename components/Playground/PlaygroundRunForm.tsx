import { Button, Collapse, Flex, Select, Text } from '@mantine/core'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'

const Model = ({ id }) => {
    const [opened, { toggle }] = useDisclosure(false)
    const [type, setType] = useState(true)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            provider: null,
            type: null
        },
        onValuesChange: (values) => {
            console.log(values)
            if (values.provider !== null) {
                setType(false)
            }
        }
    })

    return (
        <>
            <Flex
                align={'center'}
                mt={24}
                justify={'flex-start'}
                onClick={toggle}
                style={{ cursor: 'pointer' }}
            >
                <Text size={'sm'}>Model {id}</Text>
                {opened ? <IconChevronDown width={16} /> : <IconChevronRight width={16} />}
            </Flex>

            <Collapse in={opened} mb={24}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Select
                        mt={12}
                        size={'xs'}
                        placeholder="Select Provider"
                        data={['OpenAI', 'Google']}
                        key={form.key('provider')}
                        {...form.getInputProps('provider')}
                    />

                    <Select
                        mt={12}
                        size={'xs'}
                        placeholder="Pick a type"
                        data={['test 1', 'test 2', 'test 3', 'test 4', 'test 5']}
                        disabled={type}
                        key={form.key('type')}
                        {...form.getInputProps('type')}
                    />
                </form>

                <Flex align={'center'} mt={24} justify={'flex-start'} style={{ cursor: 'pointer' }}>
                    <Text size={'xs'}>Advanced options</Text>
                    <IconChevronRight width={16} />
                </Flex>
            </Collapse>
        </>
    )
}

const PlaygroundRunForm = () => {
    const [models, setModels] = useState([{ id: 1 }])

    return (
        <>
            <Button color="gray" size="xs" fullWidth>
                Run test
            </Button>
            {models.map((model) => (
                <Model id={model.id} />
            ))}

            <Button
                color="gray"
                size="xs"
                fullWidth
                mt={24}
                onClick={() => {
                    const newId = models.length > 0 ? models[models.length - 1].id + 1 : 1
                    setModels([...models, { id: newId }])
                }}
            >
                Add model
            </Button>
        </>
    )
}

export default PlaygroundRunForm
