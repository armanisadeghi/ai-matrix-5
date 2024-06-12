// app/samples/ai-tests/shared/services/aiCallRouter.ts
'use server';



// Example API handlers using native fetch
const apiHandlers: Record<string, (data: any) => Promise<any>> = {

    directChat: async (data: any) => {
        const response = await fetch('/api/directChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    simpleChat: async (data: any) => {
        const response = await fetch('/api/simpleChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    runRecipe: async (data: any) => {
        const response = await fetch('/api/runRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    runAction: async (data: any) => {
        const response = await fetch('/api/runAction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    processWorkflow: async (data: any) => {
        const response = await fetch('/api/processWorkflow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },
};

export default apiHandlers;
