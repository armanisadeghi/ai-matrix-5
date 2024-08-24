import AmeButton from "@/ui/buttons/AmeButton";
import AmePaper from "@/ui/surfaces/AmePaper";
import AmeText from "@/ui/typography/AmeText";
import { Stack } from "@mantine/core";
import { IconHourglassEmpty } from "@tabler/icons-react";

export const EmptyCourses = () => {
    return (
        <AmePaper withBorder p="lg">
            <Stack align="center">
                <IconHourglassEmpty />
                <AmeText fw={600}>You haven't received any recommendations yet </AmeText>
                <AmeText fz="sm">Recommend a course to someone else?</AmeText>
                <AmeButton title="browse courses" variant="primary">
                    Browse courses
                </AmeButton>
            </Stack>
        </AmePaper>
    );
};
