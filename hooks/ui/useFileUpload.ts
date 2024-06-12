// app/samples/ai-tests/shared/hooks/useFileUpload.ts
// OFFICIAL CHAT

import { useSetRecoilState } from 'recoil';
import { uploadedFilesAtom } from '@/state/aiAtoms/uploadAtoms';

interface UploadedFile {
    id: string;
    name: string;
    type: string;
    content: string | ArrayBuffer | null;
    status: 'pending' | 'uploaded' | 'error';
}

const useFileUpload = () => {
    const setUploadedFiles = useSetRecoilState(uploadedFilesAtom);

    const handleFileUpload = (file: File) => {
        const newFile: UploadedFile = {
            id: URL.createObjectURL(file),
            name: file.name,
            type: file.type,
            content: null,
            status: 'pending',
        };

        setUploadedFiles(prevFiles => [...prevFiles, newFile]);

        const reader = new FileReader();
        reader.onload = () => {
            setUploadedFiles(prevFiles =>
                prevFiles.map(f =>
                    f.id === newFile.id
                        ? { ...f, content: reader.result, status: 'uploaded' }
                        : f
                )
            );
        };
        reader.onerror = () => {
            setUploadedFiles(prevFiles =>
                prevFiles.map(f =>
                    f.id === newFile.id
                        ? { ...f, status: 'error' }
                        : f
                )
            );
        };
        reader.readAsDataURL(file);
    };

    return handleFileUpload;
};

export default useFileUpload;
