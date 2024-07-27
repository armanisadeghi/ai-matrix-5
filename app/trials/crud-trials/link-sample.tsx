import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TextInput, Button, List, ListItem, Title, Container } from '@mantine/core';

const Home = () => {
    const [module, setModule] = useState('');
    const router = useRouter();

    const handleImperativeNavigation = () => {
        if (module) {
            router.push(`/trials/crud-trials/${encodeURIComponent(module)}`);
        }
    };

    const handleShallowRouting = () => {
        if (module) {
            router.push(`/trials/crud-trials/${encodeURIComponent(module)}?shallow=true`, undefined, { shallow: true });
        }
    };

    return (
        <Container>
            <Title order={1}>Home Page</Title>
            <TextInput
                label="Module Name"
                placeholder="Enter module name"
                value={module}
                onChange={(event) => setModule(event.currentTarget.value)}
            />
            <List>
                <ListItem>
                    <Link href={`/trials/crud-trials/${encodeURIComponent(module)}`}>
                        <Button component="a">Navigate with Link</Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Button onClick={handleImperativeNavigation}>Navigate Imperatively</Button>
                </ListItem>
                <ListItem>
                    <Button onClick={handleShallowRouting}>Navigate with Shallow Routing</Button>
                </ListItem>
            </List>
        </Container>
    );
};

export default Home;
