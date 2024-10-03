import { ActionIcon, Button } from "@/app/dashboard/code-editor/components/Buttons";
import {
    IconBolt,
    IconCloudUpload,
    IconHome,
    IconLayoutSidebar,
    IconQuestionMark,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { IRepoData } from "@/app/dashboard/code-editor/types";
import { TextInput } from "@/app/dashboard/code-editor/components";

type HeaderProps = {
    selectedRepo: IRepoData;
    isPublishing?: boolean;
    onDeleteFromGitHub: () => void;
    onCodeAnalyze: () => void;
    onRepoClose: () => void;
    onPushToGitHub: () => void;
};

export const Header: React.FC<HeaderProps> = ({
    selectedRepo,
    onRepoClose,
    onDeleteFromGitHub,
    onCodeAnalyze,
    isPublishing,
    onPushToGitHub,
}) => {
    return (
        <div className="flex items-center justify-between px-3 py-2 rounded">
            <div className="flex items-center">
                <ActionIcon>
                    <IconLayoutSidebar />
                </ActionIcon>
                <ActionIcon>
                    <IconHome />
                </ActionIcon>
                <Button variant="subtle">{selectedRepo.name}</Button>
            </div>
            <div className="flex items-center gap-2">
                <TextInput type="text" placeholder="ask AI and search" />
                <ActionIcon>
                    <IconQuestionMark />
                </ActionIcon>
                {selectedRepo.githubUrl && (
                    <Button
                        leftSection={<IconTrash size={18} />}
                        onClick={onDeleteFromGitHub}
                        loading={isPublishing}
                        variant="danger"
                    >
                        Delete
                    </Button>
                )}
                <Button leftSection={<IconBolt size={18} />} onClick={onCodeAnalyze} loading={isPublishing}>
                    Analyze
                </Button>
                <Button
                    leftSection={<IconCloudUpload size={18} />}
                    onClick={onPushToGitHub}
                    loading={isPublishing}
                    variant="primary"
                >
                    Publish to GitHub
                </Button>
                <>|</>
                <Button onClick={onRepoClose} rightSection={<IconX size={18} />} variant="danger">
                    Close
                </Button>
            </div>
        </div>
    );
};
