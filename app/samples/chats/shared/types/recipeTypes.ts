interface Permission {
    public: boolean
    groups: string[]
    orgs: string[]
    users: string[]
}

interface Message {
    type: string
    text: string
}

interface Broker {
    name: string
    type: string
    required: boolean
    defaultValue: any // Use appropriate type based on your data (e.g., string, number, null, etc.)
}

interface CallParams {
    models: {
        verifiedModels: string[]
        eliteModel: string
        trialModels: string[]
    }
    brokers: Broker[]
    overrides: {
        stream: boolean
    }
}

interface Processors {
    permanent: string[]
    optional: string[]
}

interface PostParams {
    returnBroker: string
    processors: Processors
    defaultDisplay: string
    nextStepOptions: string[] // might need to be adjusted
}

interface Recipe {
    id: string
    name: string
    tags: string[]
    description: string
    permissions: Permission
    messages: Message[]
    callParams: CallParams
    postParams: PostParams
    sampleOutput: string
}

const recipe: Recipe = {
    id: '',
    name: '',
    tags: [],
    description: '',
    permissions: {
        public: false,
        groups: [],
        orgs: [],
        users: []
    },
    messages: [
        {
            type: 'system',
            text: ''
        }
    ],
    callParams: {
        models: {
            verifiedModels: [],
            eliteModel: '',
            trialModels: []
        },
        brokers: [
            {
                name: '',
                type: '',
                required: true,
                defaultValue: null
            }
        ],
        overrides: {
            stream: false
        }
    },
    postParams: {
        returnBroker: '',
        processors: {
            permanent: [],
            optional: []
        },
        defaultDisplay: '',
        nextStepOptions: []
    },
    sampleOutput: ''
}
