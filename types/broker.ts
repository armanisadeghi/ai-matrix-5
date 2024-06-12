export interface Broker {
    id: string;
    name: string;
    defaultValue?: string | number | boolean | string[] | number[] | File;
    officialName: string;
    dataType: string;
    description?: string;
    component: Component;
}

interface TableDataRow {
    [key: string]: any;
}

export type TableData = {
    data: TableDataRow[];
    columns: { accessor: keyof TableDataRow; header: string }[];
};

export interface Component {
    type: string;
    label?: string;
    tooltip?: string;
    description?: string;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: string | number | boolean | string[] | number[] | File;
    defaultChecked?: boolean;
    displayOrder?: number;
    validation?: string;
    dependencies?: string[];
    required?: boolean;
    options?: string[]
    groupOptions?: { value: string; label: string }[];
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string;
    exampleInputs?: string[];
    group?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number | string | boolean | string[] | number[] | File;
    onChange?: ((value: string | number | boolean) => void) | ((value: string[] | number[]) => void);
    tableData?: TableData;
    src?: any;
    alt?: string;
    radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    h?: number | "auto";
    w?: number | "auto";
    fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
    marks?: { value: number; label: string }[],
    isMarks?: boolean
}

export enum ComponentType {
    Input = 'input',
    Textarea = 'textarea',
    Slider = 'slider',
    YesNo = 'yes-no',
    Checkbox = 'checkbox',
    CheckboxGroup = 'checkbox-group',
    Switch = 'switch',
    SwitchGroup = 'switch-group',
    Select = 'select',
    Json = 'json',
    SelectWithOther = 'select-with-other',
    AttachmentsVideo = 'attachments-video',
    AttachmentsAudio = 'attachments-audio',
    AttachmentsFile = 'attachments-file',
    AttachmentsURL = 'attachments-url',
    AttachmentsMore = 'attachments-more',
    Image = 'image-paste',
}

export type BrokerData = Record<string, string | number | string[] | undefined>;