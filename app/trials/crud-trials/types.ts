// types.ts


export type DataItem = {
    id: string;
    name?: string;
    [key: string]: any;
};

export type Header = {
    id: string;
    name: string;
};

export type CategoryItem = {
    key: string;
    label: string;
    value: string;
}

