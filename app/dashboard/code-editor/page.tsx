import { Button } from "@mantine/core";

export default function CodeEditorPage() {
    return (
        <>
            <Button
                component="a"
                title="simple editor"
                href="http://localhost:3000/dashboard/code-editor/simple-editor"
            >
                Simple editor
            </Button>
            {" "}
            <Button
                component="a"
                title="complex editor"
                href="http://localhost:3000/dashboard/code-editor/complex-editor"
            >
                Complex editor
            </Button>
        </>
    );
}
