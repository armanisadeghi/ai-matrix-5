// hooks/useFileManager.ts

import { activeUserAtom } from '@/state/userAtoms';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as supabaseStorage from '@/utils/supabase/files/supabaseStorageUtil';
import * as localStorage from '@/utils/supabase/files/localStorageUtils';

export const useFileManager = (initialStorageType: 'cloud' | 'local' = 'cloud') => {
    const [storageType, setStorageType] = useState<'cloud' | 'local'>(initialStorageType);
    const activeUser = useRecoilValue(activeUserAtom);

    const uploadFile = async (file: File, path?: string) => {
        if (storageType === 'cloud') {
            await supabaseStorage.uploadFile(activeUser.auth_id, file, path);
        } else {
            await localStorage.saveLocalFile({ name: file.name, data: file, path });
        }
    };

    const getFile = async (fileName: string, path?: string) => {
        if (storageType === 'cloud') {
            return await supabaseStorage.getFile(activeUser.auth_id, fileName, path);
        } else {
            const files = await localStorage.getAllLocalFiles();
            return files.find(f => f.name === fileName && f.path === path)?.data;
        }
    };

    const updateFile = async (fileName: string, newFile: File, path?: string) => {
        if (storageType === 'cloud') {
            await supabaseStorage.updateFile(activeUser.auth_id, fileName, newFile, path);
        } else {
            const files = await localStorage.getAllLocalFiles();
            const fileIndex = files.findIndex(f => f.name === fileName && f.path === path);
            if (fileIndex !== -1) {
                await localStorage.deleteLocalFile(files[fileIndex].id);
            }
            await localStorage.saveLocalFile({ name: newFile.name, data: newFile, path });
        }
    };

    const deleteFile = async (fileName: string, path?: string) => {
        if (storageType === 'cloud') {
            await supabaseStorage.deleteFile(activeUser.auth_id, fileName, path);
        } else {
            const files = await localStorage.getAllLocalFiles();
            const file = files.find(f => f.name === fileName && f.path === path);
            if (file) {
                await localStorage.deleteLocalFile(file.id);
            }
        }
    };

    const updateSharingSettings = async (objectId: string, isPublic: boolean, shareWithAll: boolean, sharedWithUsers: string[]) => {
        if (storageType === 'cloud') {
            await supabaseStorage.updateSharingSettings(objectId, isPublic, shareWithAll, sharedWithUsers);
        } else {
            console.warn('Sharing settings are not applicable for local storage');
        }
    };

    const listFiles = async (path?: string): Promise<{ name: string }[]> => {
        if (storageType === 'cloud') {
            const files = await supabaseStorage.listFiles(activeUser.auth_id, path);
            return files || []; // Return an empty array if files is undefined
        } else {
            const files = await localStorage.getAllLocalFiles();
            return files.filter(f => f.path === path).map(f => ({ name: f.name }));
        }
    };

    return {
        uploadFile,
        getFile,
        updateFile,
        deleteFile,
        updateSharingSettings,
        listFiles,
        storageType,
        setStorageType,
    };
};
