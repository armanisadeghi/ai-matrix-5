export interface Broker {
    id: string;
    name?: string;
    components: BrokerComponent[];
}

export interface BrokerComponent {
    id: string;
    name: string;
    label?: string;
    tooltip?: string;
    placeholder?: string;
    defaultValue?: string;
    displayOrder?: number;
    validation?: string;
    dependencies?: string[];
    required?: boolean;
}

export enum ComponentType {
    Input = 'input',
    Textarea = 'textarea',
    Select = 'select',
}

export interface ComponentAttributes {
    name?: string;
    placeholderText?: string;
    required?: boolean;
    options?: string[];
    defaultValue?: string;
    validation?: string;
    dependencies?: string[];
    displayOrder?: number;
    step?: number;
    min?: number;
    max?: number;
    value?: number;
}

export interface BrokerContextValue {
    brokers: Broker[];
}

export type BrokerData = Record<string, string | number | string[] | undefined>;