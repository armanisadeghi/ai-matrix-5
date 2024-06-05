// metadataAtoms.ts


interface Metadata {
    requestId: string;
    requestIndex: number;
    requestTimestamp: string;
    requestType: string;
    requestSource: string;
    requestChannel: string;
}

export const metadataAtom = atom<Metadata>({
    requestId: 'request123',
    requestIndex: 1,
    requestTimestamp: '2024-05-25T12:00:00Z',
    requestType: 'aiChat',
    requestSource: 'simpleChat',
    requestChannel: 'text',
});
