import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
});

export const createProject = async (projectName: string, templateName?: string) => {
    const response = await api.post("/projects", { projectName, templateName });
    return response.data;
};

export const editProject = async (oldName: string, newName: string) => {
    const response = await api.put(`/projects/${oldName}`, { newName });
    return response.data;
};

export const deleteProject = async (projectName: string) => {
    const response = await api.delete(`/projects/${projectName}`);
    return response.data;
};

export const listProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};

export const listFiles = async (projectName: string) => {
    const response = await api.get(`/projects/${projectName}/files`);
    return response.data;
};

export const readFile = async (projectName: string, filePath: string) => {
    const response = await api.get(`/projects/${projectName}/files/${filePath}`);
    return response.data.content;
};

export const writeFile = async (projectName: string, filePath: string, content: string) => {
    const response = await api.put(`/projects/${projectName}/files/${filePath}`, { content });
    return response.data;
};

export const executeCommand = async (projectName: string, command: string) => {
    const response = await api.post(`/projects/${projectName}/execute`, { command });
    return response.data;
};

export const listTemplates = async () => {
    const response = await api.get("/templates");
    return response.data;
};

export const getProjectProxyUrl = async (projectName: string) => {
    const response = await api.get(`/preview/${projectName}`);
    return response.data;
};

// Edit file or folder ====

export const createItem = async (projectName: string, type: "file" | "folder", fullPath: string) => {
    const response = await api.post(`/projects/${projectName}/${type === "file" ? "files" : "folders"}`, {
        path: fullPath,
    });
    return response.data;
};

export const renameItem = async (projectName: string, oldPath: string, newPath: string): Promise<void> => {
    const response = await api.put(`/projects/${projectName}/items/${oldPath}`, { newPath });
    return response.data;
};

export const deleteItem = async (projectName: string, path: string): Promise<void> => {
    const response = await axios.delete(`/projects/${projectName}/items/${path}`);
    return response.data;
};
