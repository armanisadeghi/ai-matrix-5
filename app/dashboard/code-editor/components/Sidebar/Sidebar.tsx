import { ActionIcon } from "@/app/dashboard/code-editor/components";
import { IconBug, IconFolder, IconPlayerPlay, IconSettings } from "@tabler/icons-react";
import { ReactNode } from "react";

type SidebarProps = {
    addFileFolder: ReactNode;
    fileTree: ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ addFileFolder, fileTree }) => {
    return (
        <div className="p-2 flex flex-col rounded">
            <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-2">
                <ActionIcon>
                    <IconFolder size={18} />
                </ActionIcon>
                <ActionIcon>
                    <IconPlayerPlay size={18} />
                </ActionIcon>
                <ActionIcon>
                    <IconBug size={18} />
                </ActionIcon>
                <ActionIcon>
                    <IconSettings size={18} />
                </ActionIcon>
                {addFileFolder}
            </div>
            <div className="flex-grow overflow-auto">{fileTree}</div>
        </div>
    );
};
