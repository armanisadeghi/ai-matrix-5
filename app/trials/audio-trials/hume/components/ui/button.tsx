import { Button as MantineButton } from '@mantine/core';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <MantineButton {...props}>
        {children}
    </MantineButton>
);
