
export interface Broker {
    id: string;
    userId: string;
    matrixId: string;
    displayName: string;
    officialName: string;
    dataType: string;
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

export type ComponentTypeInfo = {
    type: string;
    label: string;
};

export const ComponentType: Record<string, ComponentTypeInfo> = {
    Input: { type: 'str', label: 'Input' },
    NumberInput: { type: 'int', label: 'Number Input' },
    Textarea: { type: 'str', label: 'Textarea' },
    Slider: { type: 'float', label: 'Slider' },
    YesNo: { type: 'bool', label: 'Yes/No' },
    Checkbox: { type: 'bool', label: 'Checkbox' },
    CheckboxGroup: { type: 'list', label: 'Checkbox Group' },
    CheckboxGroupWithOther: { type: 'list', label: 'Checkbox Group with Other' },
    Switch: { type: 'bool', label: 'Switch' },
    SwitchGroup: { type: 'list', label: 'Switch Group' },
    SwitchGroupWithOther: { type: 'list', label: 'Switch Group with Other' },
    Select: { type: 'list', label: 'Select' },
    SelectWithOther: { type: 'list', label: 'Select with Other' },
    Json: { type: 'json', label: 'JSON' },
    AttachmentsVideo: { type: 'url', label: 'Attachments (Video)' },
    AttachmentsAudio: { type: 'url', label: 'Attachments (Audio)' },
    AttachmentsFile: { type: 'url', label: 'Attachments (File)' },
    AttachmentsURL: { type: 'url', label: 'Attachments (URL)' },
    Image: { type: 'url', label: 'Image' },
};

export type BrokerData = Record<string, string | number | string[] | undefined>;