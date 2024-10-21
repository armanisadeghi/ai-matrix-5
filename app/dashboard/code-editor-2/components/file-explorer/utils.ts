import { IFileNode } from "@/app/dashboard/code-editor-2/components/file-explorer/types";

export function buildFileTree(files: { name: string; isDirectory: boolean }[]): IFileNode[] {
    const root: IFileNode = { name: "", isDirectory: true, children: [] };

    files.forEach((file) => {
        const parts = file.name.split(`\\`);
        let currentNode = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            const currentPath = parts.slice(0, index + 1).join("/");

            let child = currentNode.children?.find((node) => node.name === currentPath);

            if (!child) {
                child = {
                    name: currentPath,
                    isDirectory: isLast ? file.isDirectory : true,
                    children: isLast && !file.isDirectory ? undefined : [],
                };
                currentNode.children?.push(child);
            }

            if (!isLast || file.isDirectory) {
                currentNode = child;
            }
        });
    });

    // Recursive function to sort children of each node
    const sortNode = (node: IFileNode): IFileNode => {
        if (node.children) {
            node.children = node.children.map(sortNode).sort((a, b) => {
                // Folders first
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;

                // Then alphabetically
                return a.name.localeCompare(b.name);
            });
        }
        return node;
    };

    // Sort the root node
    sortNode(root);

    return root.children || [];
}
