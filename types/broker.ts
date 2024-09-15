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
    name?: string;
    defaultValue?: string;
    category?: string;
}

export const dataType: { [key: string]: string } = {
    str: "Text",
    int: "Number without decimals",
    float: "Number with decimals",
    bool: "Yes/No",
    dict: "Dictionary/JSON",
    list: "List or Array",
    url: "URL Link",
};

interface TableDataRow {
    [key: string]: any;
}

export type TableData = {
    data: TableDataRow[];
    columns: { accessor: keyof TableDataRow; header: string }[];
};

export interface Component {
    alt?: string;
    autosize?: any;
    color?: string;
    defaultChecked?: boolean;
    defaultValue?: string | number | boolean | string[] | number[] | File;
    dependencies?: string[];
    description?: string;
    displayOrder?: number;
    error?: string;
    exampleInputs?: string[];
    expandable?: boolean;
    file?: string;
    fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
    group?: string;
    groupOptions?: { value: string; label: string }[];
    h?: number | "auto";
    id: string;
    isMarks?: boolean;
    label?: string;
    marks?: { value: number; label: string }[];
    max?: number;
    maxRows?: number;
    maxLength?: number;
    min?: number;
    minRows?: number;
    onChange?: ((value: string | number | boolean) => void) | ((value: string[] | number[]) => void);
    options?: string[];
    placeholder?: string;
    position?: "top" | "bottom" | "left" | "right";
    radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    required?: boolean;
    resize?: any;
    selected?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    src?: any;
    step?: number;
    submitOnEnter?: boolean;
    tableData?: TableData;
    tooltip?: string;
    type: string;
    value?: number | string | boolean | string[] | number[] | File;
    validation?: boolean;
    w?: number | "auto";
    withArrow?: boolean;
    withAsterisk?: boolean;
}

export type ComponentTypeInfo = {
    type: string;
    label: string;
};

export const ComponentType: Record<string, ComponentTypeInfo> = {
    Input: { type: "str", label: "Input" },
    NumberInput: { type: "int", label: "Number Input" },
    Textarea: { type: "str", label: "Textarea" },
    Slider: { type: "float", label: "Slider" },
    YesNo: { type: "bool", label: "Yes/No" },
    Checkbox: { type: "bool", label: "Checkbox" },
    CheckboxGroup: { type: "list", label: "Checkbox Group" },
    CheckboxGroupWithOther: { type: "list", label: "Checkbox Group with Other" },
    Switch: { type: "bool", label: "Switch" },
    SwitchGroup: { type: "list", label: "Switch Group" },
    SwitchGroupWithOther: { type: "list", label: "Switch Group with Other" },
    Select: { type: "list", label: "Select" },
    SelectWithOther: { type: "list", label: "Select with Other" },
    Json: { type: "json", label: "JSON" },
    AttachmentsVideo: { type: "url", label: "Attachments (Video)" },
    AttachmentsAudio: { type: "url", label: "Attachments (Audio)" },
    AttachmentsFile: { type: "url", label: "Attachments (File)" },
    AttachmentsURL: { type: "url", label: "Attachments (URL)" },
    Image: { type: "url", label: "Image" },
};

export type BrokerData = Record<string, string | number | string[] | undefined>;
