import AmeActionIcon from "@/ui/buttons/AmeActionIcon";
import { Flex, Switch, Textarea } from "@mantine/core";
import { IconImageInPicture, IconPencilQuestion } from "@tabler/icons-react";
import AmeButton from "@/ui/buttons/AmeButton";

import classes from "./PromptTextArea.module.css";

export default function PromptTextArea() {
    return (
        <>
            <Textarea
                label="Prompt"
                placeholder="Describe your image"
                rows={5}
                rightSection={
                    <AmeActionIcon tooltip="Add image reference">
                        <IconImageInPicture size={18} />
                    </AmeActionIcon>
                }
                classNames={{ section: classes.section }}
            />
            <Flex align="center" gap="sm" justify="space-between" mt="xs">
                <Switch defaultChecked={false} label="AI prompt" />

                <AmeButton title="get suggestions" leftSection={<IconPencilQuestion size={18} />}>
                    Get suggestions
                </AmeButton>
            </Flex>
        </>
    );
}
