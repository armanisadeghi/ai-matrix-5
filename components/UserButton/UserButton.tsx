import {Avatar, Group, rem, Text, UnstyledButton, UnstyledButtonProps} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import classes from './UserButton.module.css';
import {ReactElement} from "react";

interface UserButtonProps extends Partial<UnstyledButtonProps> {
    collapsed?: boolean
}

export function UserButton({collapsed}: UserButtonProps): ReactElement {
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
                    radius="xl"
                />

                {!collapsed &&
                    <>
                        <div style={{flex: 1}}>
                            <Text size="sm" fw={500}>
                                John Doe
                            </Text>

                            <Text c="dimmed" size="xs">
                                johndoe@hotmail.com
                            </Text>
                        </div>

                        <IconChevronRight style={{width: rem(14), height: rem(14)}} stroke={1.5}/>
                    </>
                }
            </Group>
        </UnstyledButton>
    );
}
