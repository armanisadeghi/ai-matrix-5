import { Grid, Text } from "@mantine/core";
import { GiArtificialHive } from "react-icons/gi";

interface AssistantMessageProps {
    content: string | any;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ content }) => {
    return (
        <Grid>
            <Grid.Col span={2} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <GiArtificialHive size={22} style={{ color: "gray" }} />
            </Grid.Col>
            <Grid.Col span={10} style={{ display: "flex", alignItems: "center" }}>
                <Text style={{ marginLeft: "10px" }}>{content}</Text>
            </Grid.Col>
        </Grid>
    );
};

export default AssistantMessage;
