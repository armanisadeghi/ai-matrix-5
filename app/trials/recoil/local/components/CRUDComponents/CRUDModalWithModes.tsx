import React from 'react';
import { Button, Group, Modal, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CRUDModalWithModesProps, CRUDHeader, ModalMode, CRUDDataItem } from './types';
import { currentCRUDItemAtom, modalModeAtom } from './CRUDAtoms';

// Base Modal Component
const BaseCRUDModal: React.FC<Omit<CRUDModalWithModesProps, 'headers' | 'onSubmit' | 'onDelete'> & { children: React.ReactNode; title: string }> = (
    {
        opened,
        setOpened,
        title,
        children
    }) => {
    const handleClose = () => setOpened(false);

    return (
        <Modal opened={opened} onClose={handleClose} title={title} closeOnClickOutside={true} closeOnEscape={true}>
            {children}
        </Modal>
    );
};

// Add Modal Component
const AddModal: React.FC<CRUDModalWithModesProps> = ({opened, setOpened, headers, onSubmit}) => {
    const form = useForm({
        initialValues: headers.reduce((acc, header) => ({...acc, [header.id]: ''}), {}),
    });

    const handleSubmit = (values: Record<string, string>) => {
        onSubmit({id: '', ...values} as CRUDDataItem);
        setOpened(false);
    };

    return (
        <BaseCRUDModal opened={opened} setOpened={setOpened} title="Add New Item">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                {headers.map((header) => (
                    <TextInput
                        key={header.id}
                        label={header.name}
                        {...form.getInputProps(header.id)}
                    />
                ))}
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Add Item</Button>
                </Group>
            </form>
        </BaseCRUDModal>
    );
};

// View Modal Component
const ViewModal: React.FC<CRUDModalWithModesProps> = ({opened, setOpened, headers}) => {
    const currentItem = useRecoilValue(currentCRUDItemAtom);
    const setMode = useSetRecoilState(modalModeAtom);

    if (!currentItem) {
        console.error('No item selected for view mode');
        return null;
    }

    return (
        <BaseCRUDModal opened={opened} setOpened={setOpened} title="View Item">
            {headers.map((header) => (
                <TextInput
                    key={header.id}
                    label={header.name}
                    value={currentItem[header.id] || ''}
                    disabled
                />
            ))}
            <Group justify="flex-end" mt="md">
                <Button onClick={() => setMode('edit')} variant="outline">
                    Edit
                </Button>
                <Button onClick={() => setMode('delete')} color="red" variant="outline">
                    Delete
                </Button>
            </Group>
        </BaseCRUDModal>
    );
};

// Edit Modal Component
const EditModal: React.FC<CRUDModalWithModesProps> = ({opened, setOpened, headers, onSubmit}) => {
    const [currentItem, setCurrentItem] = useRecoilState(currentCRUDItemAtom);
    const setMode = useSetRecoilState(modalModeAtom);

    const form = useForm({
        initialValues: currentItem || {},
    });

    if (!currentItem) {
        console.error('No item selected for edit mode');
        return null;
    }

    const handleSubmit = (values: Record<string, string>) => {
        const updatedItem = {...currentItem, ...values};
        onSubmit(updatedItem);
        setCurrentItem(updatedItem);
        setOpened(false);
    };

    return (
        <BaseCRUDModal opened={opened} setOpened={setOpened} title="Edit Item">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                {headers.map((header) => (
                    <TextInput
                        key={header.id}
                        label={header.name}
                        {...form.getInputProps(header.id)}
                    />
                ))}
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Save Changes</Button>
                    <Button onClick={() => setMode('delete')} color="red" variant="outline">
                        Delete
                    </Button>
                </Group>
            </form>
        </BaseCRUDModal>
    );
};

// Delete Modal Component
const DeleteModal: React.FC<CRUDModalWithModesProps> = ({opened, setOpened, headers, onDelete}) => {
    const currentItem = useRecoilValue(currentCRUDItemAtom);
    const setMode = useSetRecoilState(modalModeAtom);

    if (!currentItem) {
        console.error('No item selected for delete mode');
        return null;
    }

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
            setOpened(false);
        } else {
            console.error('onDelete function is not provided');
        }
    };

    return (
        <BaseCRUDModal opened={opened} setOpened={setOpened} title="Delete Item">
            {headers.map((header) => (
                <TextInput
                    key={header.id}
                    label={header.name}
                    value={currentItem[header.id] || ''}
                    disabled
                />
            ))}
            <Text color="red" size="sm" mt="md" mb="md">Are you sure you want to delete this item?</Text>
            <Group justify="flex-end" mt="md">
                <Button onClick={handleDelete} color="red">
                    Confirm Delete
                </Button>
                <Button onClick={() => setMode('edit')} variant="outline">
                    Cancel (Edit)
                </Button>
            </Group>
        </BaseCRUDModal>
    );
};

// Main CRUDModal Component
const CRUDModalWithModes: React.FC<CRUDModalWithModesProps> = (props) => {
    const mode = useRecoilValue(modalModeAtom);

    switch (mode) {
        case 'add':
            return <AddModal {...props} />;
        case 'view':
            return <ViewModal {...props} />;
        case 'edit':
            return <EditModal {...props} />;
        case 'delete':
            return <DeleteModal {...props} />;
        default:
            return null;
    }
};

export default CRUDModalWithModes;
