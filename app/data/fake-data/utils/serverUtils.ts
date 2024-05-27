// app/data/fake-data/utils/serverUtils.ts
'use server';

import { readFile } from 'fs/promises';
import path from 'path';

// Utility function to read the content of a file asynchronously
export const readFileContent = async (fileName: string): Promise<string> => {
    const filePath = path.join(process.cwd(), 'app/data/fake-data/fake-chat-history', fileName);
    console.log(`Reading file: ${filePath}`);
    return readFile(filePath, 'utf-8');
};

// Asynchronous utility function to read multiple files and return their content
export const readMultipleFiles = async (fileNames: string[]): Promise<Record<string, string>> => {
    const fileContents: Record<string, string> = {};
    for (const fileName of fileNames) {
        fileContents[fileName] = await readFileContent(fileName);
    }
    return fileContents;
};
