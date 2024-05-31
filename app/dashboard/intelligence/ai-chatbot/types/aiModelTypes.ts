interface API {
    provider: string;
    endpoint: string;
}

interface Limitations {
    contextWindow: number;
    maxTokens: number;
    capabilities: string[];
}

interface ControlChoice {
    id: string;
    label: string;
    value: boolean;
}

interface Control {
    id: string;
    componentType: string;
    label: string;
    helpText: string;
    type: string;
    value: number | boolean; // Use appropriate type based on your data (e.g., number, boolean, etc.)
    min?: number;
    max?: number;
    step?: number;
    choices?: ControlChoice[]; // Optional, only for certain component types like switchGroup
}

interface AIModel {
    id: string;
    model: string;
    name: string;
    class: string;
    type: string;
    api: API;
    limitations: Limitations;
    controls: Control[];
}

const aiModel: AIModel = {
    id: "",
    model: "",
    name: "",
    class: "",
    type: "",
    api: {
        provider: "",
        endpoint: ""
    },
    limitations: {
        contextWindow: 0,
        maxTokens: 0,
        capabilities: []
    },
    controls: [
        {
            id: "",
            componentType: "slider",
            label: "",
            helpText: "",
            type: "float",
            value: 0.0,
            min: 0.0,
            max: 0.0,
            step: 0.01
        },
        {
            id: "",
            componentType: "switchGroup",
            label: "",
            helpText: "",
            type: "",
            value: 0,
            choices: [
                {
                    id: "",
                    label: "",
                    value: false
                }
            ],
        },

        {
            id: "",
            componentType: "slider",
            label: "",
            helpText: "",
            type: "int",
            value: 0,
            min: 1,
            max: 0,
            step: 1
        },

    ]
};

