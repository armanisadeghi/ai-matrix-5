import { atom } from 'recoil'

interface UploadedFile {
    id: string
    name: string
    type: string
    content: string | ArrayBuffer | null
    status: 'pending' | 'uploaded' | 'error'
}

export const uploadedFilesAtom = atom<UploadedFile[]>({
    key: 'uploadedFilesAtom',
    default: []
})
