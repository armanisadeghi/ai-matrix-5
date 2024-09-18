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

    //
    /**
     * Initializes the database by opening a connection and setting up object stores.
     * @returns
     */
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
                    const filesStore = db.createObjectStore(FILES_STORE_NAME, { keyPath: ["repoName", "path"] });
                    filesStore.createIndex("repoName", "repoName", { unique: false });
                }
            };
        });
    }

    //
    /**
     * Adds a repository and its files to the database.
     * @param repo
     * @returns
     */
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

    //
    /**
     *  Retrieves all repositories from the database.
     * @returns
     */
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

    //
    /**
     * Retrieves a specific repository by its name.
     * @param name
     * @returns
     */
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

    //
    /**
     * Retrieves a specific file by its repository name and path.
     * @param repoName
     * @param path
     * @returns
     */
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

    //
    /**
     * Deletes a repository and all its associated files from the database.
     * @param name
     * @returns
     */
    async deleteRepository(name: string): Promise<void> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([REPOS_STORE_NAME, FILES_STORE_NAME], "readwrite"); // Start a read-write transaction
            const repoStore = transaction.objectStore(REPOS_STORE_NAME); // Access repository store
            const fileStore = transaction.objectStore(FILES_STORE_NAME); // Access file store

            repoStore.delete(name); // Delete the repository from the store.

            //TODO: fix error on deletion
            // Use a cursor to iterate through all files and delete those belonging to the repository
            const index = fileStore.index("repoName");
            const request = index.openCursor(IDBKeyRange.only(name));

            request.onsuccess = function (event) {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    fileStore.delete(cursor.primaryKey);
                    cursor.continue();
                }
            };

            // Resolve the promise when the transaction completes.
            transaction.oncomplete = () => resolve();

            // Reject the promise if there's an error during the transaction.
            transaction.onerror = () => reject(transaction.error);
        });
    }

    //
    /**
     * Add this new method to save or update file content
     * @param repoName
     * @param path
     * @param content
     * @returns
     */
    async saveFileContent(repoName: string, path: string, content: string): Promise<void> {
        if (!this.db) await this.init(); // Ensure the database is initialized.

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME], "readwrite");
            const store = transaction.objectStore(FILES_STORE_NAME);

            // Encode the content before saving
            const encodedContent = btoa(unescape(encodeURIComponent(content)));
            const fileData: FileData = { repoName, path, content: encodedContent };
            const request = store.put(fileData);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                console.log(`File ${path} in repository ${repoName} saved successfully.`);
                resolve();
            };
        });
    }

    /**
     *
     * @param repoName
     * @param oldPath
     * @param newPath
     * @param content
     * @returns
     */
    async updateFile(repoName: string, oldPath: string, newPath: string, content: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME, REPOS_STORE_NAME], "readwrite");
            const fileStore = transaction.objectStore(FILES_STORE_NAME);
            const repoStore = transaction.objectStore(REPOS_STORE_NAME);

            // Delete the old file entry
            fileStore.delete([repoName, oldPath]);

            // Add the new file entry
            const encodedContent = btoa(unescape(encodeURIComponent(content)));
            const newFileData: FileData = { repoName, path: newPath, content: encodedContent };
            fileStore.put(newFileData);

            // Update the repository data
            const repoRequest = repoStore.get(repoName);
            repoRequest.onsuccess = () => {
                const repo = repoRequest.result;
                if (repo) {
                    delete repo.files[oldPath];
                    repo.files[newPath] = encodedContent;
                    repoStore.put(repo);
                }
            };

            transaction.oncomplete = () => {
                console.log(`File updated: ${oldPath} -> ${newPath} in repository ${repoName}`);
                resolve();
            };
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     *
     * @param repoName
     * @param oldPath
     * @param newPath
     * @returns
     */
    async updateFolder(repoName: string, oldPath: string, newPath: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME, REPOS_STORE_NAME], "readwrite");
            const fileStore = transaction.objectStore(FILES_STORE_NAME);
            const repoStore = transaction.objectStore(REPOS_STORE_NAME);

            const index = fileStore.index("repoName");
            const request = index.openCursor(IDBKeyRange.only(repoName));

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    const file = cursor.value;
                    if (file.path.startsWith(oldPath + "/")) {
                        const newFilePath = newPath + file.path.substring(oldPath.length);
                        fileStore.delete(cursor.primaryKey);
                        file.path = newFilePath;
                        fileStore.put(file);
                    }
                    cursor.continue();
                }
            };

            // Update the repository data
            const repoRequest = repoStore.get(repoName);
            repoRequest.onsuccess = () => {
                const repo = repoRequest.result;
                if (repo) {
                    const updatedFiles: { [key: string]: string } = {};
                    Object.entries(repo.files).forEach(([path, content]) => {
                        if (path.startsWith(oldPath + "/")) {
                            const newFilePath = newPath + path.substring(oldPath.length);
                            updatedFiles[newFilePath] = content as string;
                        } else {
                            updatedFiles[path] = content as string;
                        }
                    });
                    repo.files = updatedFiles;
                    repoStore.put(repo);
                }
            };

            transaction.oncomplete = () => {
                console.log(`Folder updated: ${oldPath} -> ${newPath} in repository ${repoName}`);
                resolve();
            };
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     *
     * @param repoName
     * @param path
     * @returns
     */
    async deleteFile(repoName: string, path: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME, REPOS_STORE_NAME], "readwrite");
            const fileStore = transaction.objectStore(FILES_STORE_NAME);
            const repoStore = transaction.objectStore(REPOS_STORE_NAME);

            // Delete the file entry
            fileStore.delete([repoName, path]);

            // Update the repository data
            const repoRequest = repoStore.get(repoName);
            repoRequest.onsuccess = () => {
                const repo = repoRequest.result;
                if (repo) {
                    delete repo.files[path];
                    repoStore.put(repo);
                }
            };

            transaction.oncomplete = () => {
                console.log(`File deleted: ${path} in repository ${repoName}`);
                resolve();
            };
            transaction.onerror = () => reject(transaction.error);
        });
    }

    /**
     *
     * @param repoName
     * @param path
     * @returns
     */
    async deleteFolder(repoName: string, path: string): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([FILES_STORE_NAME, REPOS_STORE_NAME], "readwrite");
            const fileStore = transaction.objectStore(FILES_STORE_NAME);
            const repoStore = transaction.objectStore(REPOS_STORE_NAME);

            const index = fileStore.index("repoName");
            const request = index.openCursor(IDBKeyRange.only(repoName));

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    const file = cursor.value;
                    if (file.path.startsWith(path + "/")) {
                        fileStore.delete(cursor.primaryKey);
                    }
                    cursor.continue();
                }
            };

            // Update the repository data
            const repoRequest = repoStore.get(repoName);
            repoRequest.onsuccess = () => {
                const repo = repoRequest.result;
                if (repo) {
                    const updatedFiles: { [key: string]: string } = {};
                    Object.entries(repo.files).forEach(([filePath, content]) => {
                        if (!filePath.startsWith(path + "/")) {
                            updatedFiles[filePath] = content as string;
                        }
                    });
                    repo.files = updatedFiles;
                    repoStore.put(repo);
                }
            };

            transaction.oncomplete = () => {
                console.log(`Folder deleted: ${path} in repository ${repoName}`);
                resolve();
            };
            transaction.onerror = () => reject(transaction.error);
        });
    }
}

// Export a singleton instance of the IndexedDBStore class.
export const indexedDBStore = new IndexedDBStore();
