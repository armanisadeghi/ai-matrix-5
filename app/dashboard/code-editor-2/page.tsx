"use client";

import { ProjectCard } from "./components";
import { useEffect, useState } from "react";
import { listProjects } from "@/app/dashboard/code-editor-2/utils";
import { IconPlus } from "@tabler/icons-react";
import { Button, TextInput } from "@/app/dashboard/code-editor-2/components";
import { CreateProjectModal } from "app/dashboard/code-editor-2/components/modals";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [createProjectOpened, { open: createProjectOpen, close: createProjectClose }] = useDisclosure(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            const fetchedProjects = await listProjects();
            setProjects(fetchedProjects);
        };
        void fetchProjects();
    }, []);

    const handleRefresh = async () => {
        const fetchedProjects = await listProjects();
        setProjects(fetchedProjects);
    };

    const handleProjectSelect = (projectName: string) => {
        try {
            router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/code-editor-2/projects/${encodeURIComponent(projectName)}`,
            );
        } catch (error) {
            console.error("Error loading repository:", error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold">Recent</h1>
                    <p>Pick up where you left off</p>
                </div>
                <div className="flex gap-2">
                    <TextInput placeholder="search in projects" />
                    <Button leftSection={<IconPlus size={16} />} onClick={createProjectOpen}>
                        Create
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {projects.map((p) => (
                    <ProjectCard key={p} project={p} onClick={() => handleProjectSelect(p)} />
                ))}
            </div>
            <CreateProjectModal opened={createProjectOpened} onClose={createProjectClose} onRefresh={handleRefresh} />
        </div>
    );
};

export default HomePage;
