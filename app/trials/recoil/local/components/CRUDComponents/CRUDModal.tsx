import { CRUDModalProps } from '@/app/trials/recoil/local/components/CRUDComponents/types';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentCRUDItemAtom } from './CRUDAtoms';

const CRUDModal = ({ opened, setOpened, headers, onSubmit, onDelete, title, submitLabel, readOnly = false, toggleEditMode }: CRUDModalProps) => {
    const [currentItem, setCurrentItem] = useRecoilState(currentCRUDItemAtom);

    const form = useForm({
        initialValues: currentItem || {},
    });

    useEffect(() => {
        if (opened) {
            form.setValues(currentItem || {});
        } else {
            form.reset();
            setCurrentItem(null);
        }
    }, [opened, currentItem]);

    const handleSubmit = () => {
        onSubmit(form.values);
        setOpened(false);
    };

    const handleClose = () => {
        setOpened(false);
    };

    return (
        <Modal opened={opened} onClose={handleClose} title={title} closeOnClickOutside={true} closeOnEscape={true}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                {headers.map((header) => (
                    <TextInput
                        key={header.id}
                        label={header.name}
                        {...form.getInputProps(header.id)}
                        disabled={readOnly}
                    />
                ))}
                <Group justify="flex-end" mt="md">
                    {readOnly && toggleEditMode && (
                        <Button onClick={toggleEditMode} variant="outline">
                            Edit
                        </Button>
                    )}
                    {!readOnly && (
                        <Button type="submit">
                            {submitLabel}
                        </Button>
                    )}
                    {readOnly && onDelete && (
                        <Button onClick={() => { onDelete(); setOpened(false); }} color="red">
                            Delete
                        </Button>
                    )}
                </Group>
            </form>
        </Modal>
    );
};

export default CRUDModal;
