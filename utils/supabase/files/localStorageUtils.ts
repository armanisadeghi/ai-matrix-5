// utils/localStorageUtils.ts

import { openDB } from 'idb';

const dbName = 'matrixDB';
const storeName = 'user_files';

// need to consider if we should create a sub-category for different types of files, such as "audio", "video", "image", "document", 'presentations', 'spreadsheets', 'pdfs', 'text', 'code', 'other'

const openMatrixDB = () => {
    return openDB(dbName, 1, {
        upgrade(db) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        },
    });
};

export const saveLocalFile = async (file: any) => {
    const db = await openMatrixDB();
    return db.put(storeName, file);
};

export const getLocalFile = async (id: number) => {
    const db = await openMatrixDB();
    return db.get(storeName, id);
};

export const getAllLocalFiles = async () => {
    const db = await openMatrixDB();
    return db.getAll(storeName);
};

export const deleteLocalFile = async (id: number) => {
    const db = await openMatrixDB();
    return db.delete(storeName, id);
};

// Need to add getLocalFileList
// Get local files by type.
