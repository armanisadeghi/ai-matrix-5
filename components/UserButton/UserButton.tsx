import {
  Avatar,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { IconChevronRight, IconSettings } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { PATH_ACCOUNT } from "@/routes";
import Link from "next/link";

interface UserButtonProps extends Partial<UnstyledButtonProps> {
  collapsed?: boolean;
}

export function UserButton({ collapsed }: UserButtonProps) {
  return (
    <Menu shadow="md" width={200} position="right-end" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
              radius="xl"
            />

            {!collapsed && (
              <>
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    John Doe
                  </Text>

                  <Text c="dimmed" size="xs">
                    johndoe@hotmail.com
                  </Text>
                </div>

                <IconChevronRight
                  style={{ width: rem(14), height: rem(14) }}
                  stroke={1.5}
                />
              </>
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href={PATH_ACCOUNT.settings}
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
