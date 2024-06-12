// nice-working/ErrorManagement/ErrorBoundry.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Code, Container, Group, Spoiler, ThemeIcon } from "@mantine/core";
import { IconBug } from "@tabler/icons-react";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    errorStack?: string;
    errorInfo?: string;
    errorName?: string;
    errorCause?: string;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            errorStack: undefined,
            errorInfo: undefined,
            errorName: undefined,
            errorCause: undefined,
        };
    }

    static getDerivedStateFromError(_: Error): State {
        return {
            hasError: true,
            errorStack: _.stack,
            errorInfo: _.message,
            errorCause: _.cause as unknown as string,
            errorName: _.name,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container pt="lg">
                    <Group mb="md">
                        <ThemeIcon variant="light" color="red" size="xl">
                            <IconBug />
                        </ThemeIcon>
                        <AmeTitle order={2}>Something went wrong - "{this.state.errorInfo}"</AmeTitle>
                    </Group>
                    <AmeText mb="sm">Error stack</AmeText>
                    <Code block color="var(--mantine-color-red-light)">
                        <Spoiler maxHeight={160} showLabel="Show more" hideLabel="Hide">
                            {this.state.errorStack}
                        </Spoiler>
                    </Code>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
