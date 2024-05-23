import {Paper, useMantineTheme} from "@mantine/core";

interface ChatItemProps {
    message: string
    isMe?: boolean // if message is from user
}

export function ChatItem(props: ChatItemProps): React.JSX.Element {
    const {message, isMe} = props
    const theme = useMantineTheme()

    return (
        <Paper
            px="xs"
            py={4}
            style={{
                width: '60%',
                marginLeft: isMe ? 0 : 'auto',
                textAlign: isMe ? 'left' : 'right',
                backgroundColor: isMe ? theme.colors.gray[2] : theme.colors.blue[7],
                color: isMe ? theme.colors.dark[8] : theme.white
            }}
        >
            {message}
        </Paper>
    );
}