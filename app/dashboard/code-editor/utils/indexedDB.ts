import { IRepoData } from "../types";

// Constants for the database name and object store names.
const DB_NAME = "GithubImportDB";
const REPOS_STORE_NAME = "repositories";
const FILES_STORE_NAME = "files";

// Interfaces to define the structure of repository and file data.

interface FileData {
    repoName: string; // Repository name the file belongs to
    path: string; // Path to the file
    content: string; // Content of the file
}

// Class to handle IndexedDB operations.
class IndexedDBStore {
    private db: IDBDatabase | null = null; // Reference to the IndexedDB database

    // Initializes the database by opening a connection and setting up object stores.
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 2); // Open the database (version 2)

            // Handle errors while opening the database.
            request.onerror = () => reject(request.error);

            // On success, store the database reference and resolve the promise.
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            // If the database needs to be upgraded (or created), create the necessary object stores.
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object store for repositories if it doesn't already exist.
                if (!db.objectStoreNames.contains(REPOS_STORE_NAME)) {
                    db.createObjectStore(REPOS_STORE_NAME, { keyPath: "name" });
                }

                // Create object store for files with a composite key of repoName and path.
                if (!db.objectStoreNames.contains(FILES_STORE_NAME)) {
                    db.createObjectStore(FILES_STORE_NAME, { keyPath: ["repoName", "path"] });
                }
            };
        });
    }

    // Adds a repository and its files to the database.
    async addRepository(repo: IRepoData): Promise<void> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            // Create a transaction to perform read/write operations on both stores.
            const transaction = this.db!.transaction([REPOS_STORE_NAME, FILES_STORE_NAME], "readwrite");
            const repoStore = transaction.objectStore(REPOS_STORE_NAME); // Access repository store
            const fileStore = transaction.objectStore(FILES_STORE_NAME); // Access file store

            repoStore.put(repo); // Store the repository details.

            // Store each file in the file store.
            Object.entries(repo.files).forEach(([path, content]) => {
                fileStore.put({ repoName: repo.name, path, content });
            });

            // Resolve the promise when the transaction completes successfully.
            transaction.oncomplete = () => resolve();

            // Reject the promise if there's an error during the transaction.
            transaction.onerror = () => reject(transaction.error);
        });
    }

    // Retrieves all repositories from the database.
    async getRepositories(): Promise<IRepoData[]> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([REPOS_STORE_NAME], "readonly"); // Start a read-only transaction
            const store = transaction.objectStore(REPOS_STORE_NAME); // Access repository store
            const request = store.getAll(); // Request all entries in the store

            request.onerror = () => reject(request.error); // Handle errors in the request
            request.onsuccess = () => resolve(request.result); // Return the result on success
        });
    }

    // Retrieves a specific repository by its name.
    async getRepository(name: string): Promise<IRepoData | undefined> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([REPOS_STORE_NAME], "readonly"); // Start a read-only transaction
            const store = transaction.objectStore(REPOS_STORE_NAME); // Access repository store
            const request = store.get(name); // Request the repository by name

            request.onerror = () => reject(request.error); // Handle errors in the request
            request.onsuccess = () => resolve(request.result); // Return the result on success
        });
    }

    // Retrieves a specific file by its repository name and path.
    async getFile(repoName: string, path: string): Promise<FileData | undefined> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME], "readonly"); // Start a read-only transaction
            const store = transaction.objectStore(FILES_STORE_NAME); // Access file store
            const request = store.get([repoName, path]); // Request the file by composite key [repoName, path]

            request.onerror = () => reject(request.error); // Handle errors in the request
            request.onsuccess = () => resolve(request.result); // Return the result on success
        });
    }

    // Deletes a repository and all its associated files from the database.
    async deleteRepository(name: string): Promise<void> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([REPOS_STORE_NAME, FILES_STORE_NAME], "readwrite"); // Start a read-write transaction
            const repoStore = transaction.objectStore(REPOS_STORE_NAME); // Access repository store
            const fileStore = transaction.objectStore(FILES_STORE_NAME); // Access file store

            repoStore.delete(name); // Delete the repository from the store.

            // Create an index on the file store by `repoName` and delete all files associated with the repository.
            const fileIndex = fileStore.index("repoName");
            const fileRequest = fileIndex.openKeyCursor(IDBKeyRange.only(name));

            // Delete each file in the repository.
            fileRequest.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursor>).result;
                if (cursor) {
                    fileStore.delete(cursor.primaryKey); // Delete the file
                    cursor.continue(); // Move to the next file in the cursor
                }
            };

            // Resolve the promise when the transaction completes.
            transaction.oncomplete = () => resolve();

            // Reject the promise if there's an error during the transaction.
            transaction.onerror = () => reject(transaction.error);
        });
    }
}

// Export a singleton instance of the IndexedDBStore class.
export const indexedDBStore = new IndexedDBStore();
