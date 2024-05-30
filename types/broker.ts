export interface Broker {
    id: string;
    name?: string;
    dataType: string[];
    components: Component[];
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
    placeholderText?: string;
    defaultValue?: string;
    displayOrder?: number;
    validation?: string;
    dependencies?: string[];
    required?: boolean;
    options?: string[];
    size?: string;
    color?: string;
    exampleInputs?: string[];
    group?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: ((value: string | number | boolean) => void) | ((value: string[] | number[]) => void);
    tableData?: TableData;
    src?: any;
    alt?: string;
    radius?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    h?: number;
    w?: number;
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
    AttachmentsImage = 'attachments-image',
    AttachmentsVideo = 'attachments-video',
    AttachmentsAudio = 'attachments-audio',
    AttachmentsFile = 'attachments-file',
    AttachmentsURL = 'attachments-url',
    AttachmentsMore = 'attachments-more',
    Image = 'image-paste',
}
export interface BrokerContextValue<T> {
    brokers: Broker[];
    setBrokers: React.Dispatch<React.SetStateAction<Broker[]>>;
}

export type BrokerData = Record<string, string | number | string[] | undefined>;