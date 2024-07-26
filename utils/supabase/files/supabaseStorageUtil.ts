// utils/supabaseStorageUtil.ts
import supabase from '@/utils/supabase/client';

// Function to upload a file, with an optional path parameter
export async function uploadFile(userId: string, file: File, path?: string): Promise<void> {
    const filePath = path ? `${userId}/${path}/${file.name}` : `${userId}/${file.name}`;
    const { data, error } = await supabase.storage
    .from('user_files')
    .upload(filePath, file);

    if (error) {
        console.log('ERROR! Props:', userId, file, path, filePath, data)
        throw new Error('Error downloading file: ' + error.message);
    }
}

// Function to retrieve a file
export async function getFile(userId: string, fileName: string, path?: string): Promise<Blob> {
    const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;
    const { data, error } = await supabase.storage
    .from('user_files')
    .download(filePath);

    if (error) {
        console.log('ERROR! Props:', userId, fileName, path, filePath, data)
        throw new Error('Error downloading file: ' + error.message);
    }
    console.log('File downloaded successfully:')
    return data;
}

// Function to update a file
export async function updateFile(userId: string, fileName: string, newFile: File, path?: string): Promise<void> {
    const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;

    // Delete the old file
    const { error: deleteError } = await supabase.storage
    .from('user_files')
    .remove([filePath]);

    if (deleteError) throw new Error('Error deleting old file: ' + deleteError.message);

    // Upload the new file
    const { error: uploadError } = await supabase.storage
    .from('user_files')
    .upload(filePath, newFile);

    if (uploadError) throw new Error('Error uploading new file: ' + uploadError.message);
}

// Function to delete a file
export async function deleteFile(userId: string, fileName: string, path?: string): Promise<void> {
    const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;
    const { error } = await supabase.storage
    .from('user_files')
    .remove([filePath]);

    if (error) throw new Error('Error deleting file: ' + error.message);
}

// Function to update sharing settings
export async function updateSharingSettings(objectId: string, isPublic: boolean, shareWithAll: boolean, sharedWithUsers: string[]): Promise<void> {
    const { data, error } = await supabase
    .from('file_sharing')
    .update({ is_public: isPublic, share_with_all: shareWithAll, shared_with_users: sharedWithUsers })
    .match({ object_id: objectId });

    if (error) throw new Error('Error updating sharing settings: ' + error.message);
    console.log('Sharing settings updated:', data);
}

// Function to list user files
export async function listFiles(userId: string, path?: string): Promise<{ name: string }[]> {
    // Determine the prefix path
    const prefix = path ? `${userId}/${path}/` : `${userId}/`;

    // Retrieve the list of files
    const { data, error } = await supabase.storage
    .from('user_files')
    .list(prefix);

    if (error) throw new Error('Error listing files: ' + error.message);

    // Return the list of files
    return data;
}
