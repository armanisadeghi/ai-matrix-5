import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button } from '@mantine/core';

function RightDrawer() {
    const [opened, { open, close }] = useDisclosure(true);

    return (
        <>
            <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Matrix Apps">
                {/* Drawer content */}
            </Drawer>

            <Button onClick={open}>Open Drawer</Button>
        </>
    );
}
export default RightDrawer;
