export type CRUDDataItem = {
    id?: string;
    name?: string;
    [key: string]: any;
};

export type CRUDHeader = {
    id: string;
    name: string;
};

export interface CRUDTableProps {
    headers?: CRUDHeader[];
    data?: CRUDDataItem[];
    onDelete?: (id: string) => void;
    onEdit?: (item: CRUDDataItem) => void;
    onAdd?: (item: CRUDDataItem) => void;
    loading?: boolean;
}

type BaseCRUDModalProps = {
    opened: boolean;
    setOpened: (opened: boolean) => void;
    headers: CRUDHeader[];
    onSubmit: (values: CRUDDataItem) => void;
    onDelete: () => void;
};

export type CRUDModalWithModesProps = BaseCRUDModalProps;

export type CRUDAction = 'add' | 'edit' | 'view' | 'delete';

export interface CRUDTableProps {
    headers?: CRUDHeader[];
    data?: CRUDDataItem[];
    onDelete?: (id: string) => void;
    onEdit?: (item: CRUDDataItem) => void;
    onAdd?: (item: CRUDDataItem) => void;
    onView?: (item: CRUDDataItem) => void;
    loading?: boolean;
    handleAction?: (action: CRUDAction, item?: CRUDDataItem) => Promise<boolean | void>;
}

export type ModalMode = 'add' | 'view' | 'edit' | 'delete' | 'none';

export type CRUDModalProps = BaseCRUDModalProps & {
    title: string;
    submitLabel: string;
    readOnly?: boolean;
    toggleEditMode?: () => void;
};
