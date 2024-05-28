export interface Broker {
    id: string;
    name?: string;
    dataType: string[];
    components: Component[];
}

export interface Component {
    type: ComponentType;
    label?: string;
    tooltip?: string;
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
    SelectWithOther = 'select-with-other',
    AttachmentsImage = 'attachments-image',
    AttachmentsVideo = 'attachments-video',
    AttachmentsAudio = 'attachments-audio',
    AttachmentsFile = 'attachments-file',
    AttachmentsURL = 'attachments-url',
    AttachmentsMore = 'attachments-more',
    ImagePaste = 'image-paste',
}
export interface BrokerContextValue {
    brokers: Broker[];
}

export type BrokerData = Record<string, string | number | string[] | undefined>;