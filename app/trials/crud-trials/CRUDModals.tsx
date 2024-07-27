import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

type AddItemModalProps = {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    addNewItem: (item: {
        name: string;
        age: string;
        product: string;
        price: string;
        city: string;
        population: string;
    }) => void;
};


const AddItemModal = ({ opened, setOpened, addNewItem }: AddItemModalProps) => {
    const form = useForm({
        initialValues: {
            name: '',
            age: '',
            product: '',
            price: '',
            city: '',
            population: ''
        },
    });

    const handleSubmit = () => {
        addNewItem(form.values);
        setOpened(false);
        form.reset();
    };

    return (
        <Modal opened={opened} onClose={() => setOpened(false)} title="Add New Item">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" {...form.getInputProps('name')} />
                <TextInput label="Age" {...form.getInputProps('age')} />
                <TextInput label="Product" {...form.getInputProps('product')} />
                <TextInput label="Price" {...form.getInputProps('price')} />
                <TextInput label="City" {...form.getInputProps('city')} />
                <TextInput label="Population" {...form.getInputProps('population')} />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Add</Button>
                </Group>
            </form>
        </Modal>
    );
};

type EditItemModalProps = {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    currentItem: {
        name?: string;
        age?: string;
        product?: string;
        price?: string;
        city?: string;
        population?: string;
    } | null;
    updateItem: (item: {
        name: string;
        age: string;
        product: string;
        price: string;
        city: string;
        population: string;
    }) => void;
};

// Modal for editing items
const EditItemModal = ({ opened, setOpened, currentItem, updateItem }: EditItemModalProps) => {
    const form = useForm({
        initialValues: {
            name: currentItem?.name || '',
            age: currentItem?.age || '',
            product: currentItem?.product || '',
            price: currentItem?.price || '',
            city: currentItem?.city || '',
            population: currentItem?.population || ''
        },
    });

    const handleSubmit = () => {
        updateItem(form.values);
        setOpened(false);
    };

    return (
        <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Item">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput label="Name" {...form.getInputProps('name')} />
                <TextInput label="Age" {...form.getInputProps('age')} />
                <TextInput label="Product" {...form.getInputProps('product')} />
                <TextInput label="Price" {...form.getInputProps('price')} />
                <TextInput label="City" {...form.getInputProps('city')} />
                <TextInput label="Population" {...form.getInputProps('population')} />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Update</Button>
                </Group>
            </form>
        </Modal>
    );
};

export { AddItemModal, EditItemModal };
