// ui/markdown/controls/InsertStarControl.tsx
import { Button } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useRichTextEditorContext } from "../RichTextEditorContextProvider";

const InsertStarControl = () => {
    const { editor } = useRichTextEditorContext();
    return (
        <Button
            onClick={() => editor?.commands.insertContent("⭐")}
            aria-label="Insert star emoji"
            title="Insert star emoji"
        >
            <IconStar stroke={1.5} size="1rem" />
        </Button>
    );
};

export default InsertStarControl;
