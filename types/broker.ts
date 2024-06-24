
export interface Broker {
    id: string;
    displayName: string;
    officialName: string;
    dataType: "str" | "int" | "float" | "bool" | "dict" | "list" | "url";
    description?: string;
    componentType: string;
    validationRules?: string;
    tooltip?: string;
    sampleEntries?: string[];
}

export const dataType: { [key: string]: string } = {
    'str': 'Text',
    'int': 'Number without decimals',
    'float': 'Number with decimals',
    'bool': 'Yes/No',
    'dict': 'Dictionary/JSON',
    'list': 'List or Array',
    'url': 'URL Link',
};

interface TableDataRow {
    [key: string]: any;
}

export type TableData = {
    data: TableDataRow[];
    columns: { accessor: keyof TableDataRow; header: string }[];
};

export interface Component {
    id: string;
    type: string;
    label?: string;
    tooltip?: string;
    description?: string;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: string | number | boolean | string[] | number[] | File;
    defaultChecked?: boolean;
    displayOrder?: number;
    validation?: boolean;
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
    minRows?: number
    maxRows?: number
    position?: "top" | "bottom" | "left" | "right"
    withArrow?: boolean
    withAsterisk?: boolean
    resize?: any
    autosize?: any
    submitOnEnter?: boolean
    expandable?: boolean
    error?: string
}

export enum ComponentType {
    Input = 'input',
    Textarea = 'textarea',
    Slider = 'slider',
    YesNo = 'yes-no',
    Checkbox = 'checkbox',
    CheckboxGroup = 'checkbox-group',
    CheckboxGroupWithOther = 'checkbox-group-with-other',
    Switch = 'switch',
    SwitchGroup = 'switch-group',
    SwitchGroupWithOther = 'switch-group-with-other',
    Select = 'select',
    SelectWithOther = 'select-with-other',
    Json = 'json',
    AttachmentsVideo = 'attachments-video',
    AttachmentsAudio = 'attachments-audio',
    AttachmentsFile = 'attachments-file',
    AttachmentsURL = 'attachments-url',
    Image = 'image-paste',
}

export type BrokerData = Record<string, string | number | string[] | undefined>;