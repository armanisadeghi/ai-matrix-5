"use client";

import { ProjectCreator } from "./components";
import { useEffect, useState } from "react";
import { listProjects } from "@/app/dashboard/code-editor-2/utils";

const HomePage: React.FC = () => {
    const [projects, setProjects] = useState([]);

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

    return (
        <div>
            <h1>Web-based Code Editor</h1>
            {projects.map((p) => (
                <p key={p}>{p}</p>
            ))}
            <ProjectCreator onRefresh={handleRefresh} />
        </div>
    );
};

export default HomePage;
