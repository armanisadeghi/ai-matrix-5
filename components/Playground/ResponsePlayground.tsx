import { Button, Flex, Group, Paper, Select, Text, Textarea } from "@mantine/core";
import {
    IconArrowsDiagonal,
    IconArrowsDiagonalMinimize2,
    IconSquareRoundedArrowLeft,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

const ResponsePlayground = () => {
    const [minimize, setMinimize] = useState(true);
    return (
        <Paper withBorder p="md">
            <Flex align={"center"} justify={"space-between"}>
                <Text size={"xs"}>Response 1</Text>
                <Group>
                    <IconTrash width={16} />
                    {!minimize ? (
                        <IconArrowsDiagonalMinimize2
                            width={16}
                            style={{ cursor: "pointer" }}
                            onClick={() => setMinimize(!minimize)}
                        />
                    ) : (
                        <IconArrowsDiagonal
                            width={16}
                            style={{ cursor: "pointer" }}
                            onClick={() => setMinimize(!minimize)}
                        />
                    )}
                </Group>
            </Flex>

            {minimize ? (
                <div style={{ maxHeight: 80, overflow: "hidden" }}>
                    <Text size={"xs"} onClick={() => setMinimize(false)}></Text>
                </div>
            ) : (
                <Textarea autosize={true} variant="unstyled" size={"xs"} defaultValue={""} />
            )}

            <Flex justify={"space-between"} mt={24}>
                <Select
                    size={"xs"}
                    placeholder="Pick a type"
                    data={["Text", "Markdown", "Form", "Table", "JSON"]}
                    defaultValue="Text"
                />

                <Flex gap={8}>
                    <Button color="gray" size="xs" leftSection={<IconSquareRoundedArrowLeft width={14} />}>
                        Move
                    </Button>
                    <Button color="gray" size="xs">
                        Clean
                    </Button>
                    <Button color="gray" size="xs">
                        Test
                    </Button>
                </Flex>
            </Flex>
        </Paper>
    );
};

export default ResponsePlayground;
