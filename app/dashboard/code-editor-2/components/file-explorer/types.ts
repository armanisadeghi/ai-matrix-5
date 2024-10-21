export interface IFileNode {
    name: string;
    isDirectory: boolean;
    children?: IFileNode[];
}
