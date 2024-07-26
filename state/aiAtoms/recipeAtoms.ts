import { BrokerValue, Broker } from '@/redux/features/broker/types';
import { DynamicEvent } from '@/redux/features/dynamicEvents/types';
import { FlatRecipeData, SimpleRecipeData } from '@/redux/features/recipes/types';
import { SocketTask } from '@/utils/socketio/SocketManager';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';


export const brokerAtomFamily = atomFamily<Broker, any>({
    key: 'BrokerAtomFamily',  // Used for the brokers themselves. Focused on the frontend logic.
    default: selectorFamily<any, any>({
        key: 'BrokerValueFamily/Default',
        get: (id) => () => ({
            id: '',
            officialName: '',
            dataType: '',
            createdAt: '',
            displaName: '',
            description: '',
            componentType: '',
            additionalParams: {},
            validationRules: {},
            tooltip: '',
            sampleEntries: null,
            userId: null,
            defaultValue: null,
            uid: null,
            matrixId: null,
            ready: null,
            value: null,
        }),
    }),
});

export const brokerValueFamily = atomFamily<BrokerValue, string>({
    key: 'BrokerValueFamily',  // Focused on what the backend needs.
    default: selectorFamily<BrokerValue, string>({
        key: 'BrokerValueFamily/Default',
        get: (id) => () => ({
            id,
            official_name: '',
            name: '',
            tooltip: '',
            value: null,
            data_type: '',
            ready: null,
        }),
    }),
});

export const recipeBrokerAtomFamily = atomFamily({
    key: 'recipeBrokerAtomFamily',
    default: [],
});

export const areBrokersReadySelector = selectorFamily({
    key: 'areBrokersReadySelector',
    get: (recipeId) => ({get}) => {
        const brokerIds = get(recipeBrokerAtomFamily(recipeId));
        return brokerIds.every(brokerId => {
            const broker = get(recipeBrokerAtomFamily(brokerId));
            return broker.ready === true;
        });
    },
});
export const allRecipeBrokersSelector = selectorFamily({
    key: 'areBrokersReadySelector',
    get: (recipeId) => ({get}) => {
        const brokerIds = get(recipeBrokerAtomFamily(recipeId));
        let allBrokers = [];
        brokerIds.forEach(brokerId => {
            const broker = get(recipeBrokerAtomFamily(brokerId));
            allBrokers.push(broker);
        });
        return allBrokers;
    },
});

export const readyBrokersSelector = selectorFamily({
    key: 'readyBrokersSelector',
    get: (recipeId) => ({get}) => {
        const brokerIds = get(recipeBrokerAtomFamily(recipeId));
        return brokerIds.map(brokerId => {
            const broker = get(recipeBrokerAtomFamily(brokerId));
            return broker.ready === true ? broker : null;
        }).filter(broker => broker !== null);
    },
});

export const socketRequestTaskAtom = atom<string | null>({
    key: 'socketRequestTaskAtom',
    default: 'run_recipe',
});

export const requestStreamAtom = atom<boolean>({
    key: 'requestStreamAtom',
    default: true,
});

export const taskDataAtom = atom<Record<string, any> | null>({
    key: 'taskDataAtom',
    default: null,
});

export const flatRecipeDataFamily = atomFamily<FlatRecipeData, string>({
    key: 'FlatRecipeDataFamily',
    default: selectorFamily<FlatRecipeData, string>({
        key: 'FlatRecipeDataFamily/Default',
        get: (recipe_id) => () => ({
            recipe_id,
            needed_brokers: [],
            broker_values: [],
            model_override: '',
            processor_override: {},
            other_overrides: {},
            overrides: {},
            stream: false,
        }),
    }),
});

export const textEntryAtom = atom<string>({
    key: 'textEntryAtom',
    default: '',
});

export const envAtom = atom<string>({
    key: 'EnvAtom',
    default: 'local',
});

export const socketSessionUrlSelector = selector<string>({
    key: 'SocketSessionUrlSelector',
    get: ({get}) => {
        const env = get(envAtom);

        const urlMap = {
            local: 'http://localhost:8000',
            devServer: 'https://dev-back.aimatrixengine.com',
            prodServer: 'https://prod-back.aimatrixengine.com',
        };

        return urlMap[env];
    },
});

export const socketSessionUrlAtom = atom<string | null>({
    key: 'socketSessionUrlAtom',
    default: null,
});

export const isAuthenticatedAtom = atom<boolean>({
    key: 'isAuthenticatedAtom',
    default: false,
});

export const socketSidAtom = atom<string | null>({
    key: 'socketSidAtom',
    default: null,
});

export const activeRecipeIdAtom = atom<string>({
    key: 'activeRecipeIdAtom',
    default: '6618283c8b434eb62211af43',
});

export const requestEventAtom = atom<string | null>({
    key: 'requestEventAtom',
    default: 'simple_recipe',
});

export const socketNamespaceAtom = atom<string | null>({
    key: 'socketNamespaceAtom',
    default: '/UserSession',
});

export const dynamicEventStatusFamily = atomFamily<'assigned' | 'streaming' | 'completed' | 'ongoing' | 'active' | 'inactive', string>({
    key: 'DynamicEventStatusFamily',
    default: 'inactive',
});

export const dynamicEventFamily = atomFamily<DynamicEvent, string>({
    key: 'DynamicEventFamily',
    default: selectorFamily<DynamicEvent, string>({
        key: 'DynamicEventFamily/Default',
        get: (eventName) => ({get}) => {
            const sid = get(socketSidAtom);
            const namespace = get(socketNamespaceAtom);
            const status = get(dynamicEventStatusFamily(eventName));

            return {
                eventName,
                namespace: namespace,
                sid: sid || '',
                status: status,
                textStream: '',
                listener: null,
            };
        },
    }),
});

export const modelNameOverrideAtom = atom<string | null>({
    key: 'modelNameOverrideAtom',
    default: null,
});

export const processorOverridesAtom = atom<Record<string, any>>({
    key: 'processorOverridesAtom',
    default: {},
});

export const otherOverridesAtom = atom<Record<string, any>>({
    key: 'otherOverridesAtom',
    default: {},
});

export const activeRecipesAtomFamily = atomFamily<any[], string>({
    key: 'activeRecipesAtomFamily',
    default: [],
});

export const simpleRecipeDataSelectorFamily = selectorFamily<SimpleRecipeData, string>({
    key: 'simpleRecipeDataSelectorFamily',
    get: (recipeId) => ({get}) => ({
        recipe_id: recipeId,
        broker_values: get(allBrokersSelector),
        overrides: {
            model_override: get(modelNameOverrideAtom),
            processor_override: get(processorOverridesAtom),
            other_overrides: get(otherOverridesAtom),
        },
        stream: get(requestStreamAtom),
    }),
});

export const runSimpleRecipeSocketTaskSelector = selectorFamily<SocketTask, string>({
    key: 'runSimpleRecipeSocketTaskSelector',
    get: (recipeId) => ({get}) => {
        const task = get(socketRequestTaskAtom);
        const broker_values = get(readyBrokersSelector(recipeId));
        const stream = get(requestStreamAtom);

        const recipeData = {
            recipe_id: recipeId,
            broker_values: get(readyBrokersSelector(recipeId)),
            overrides: {
                model_override: get(modelNameOverrideAtom),
                processor_override: get(processorOverridesAtom),
                other_overrides: get(otherOverridesAtom),
            },
        };

        const validBrokers = broker_values.filter(broker =>
            broker.ready === true || (broker.ready === false && broker.value !== null)
        );

        return [{
            task: task,
            index: 0,
            stream,
            taskData: {
                ...recipeData,
                broker_values: validBrokers,
            },
        }];
    },
});

export const activeRecipeStreamAtom = atom<string>({
    key: 'activeRecipeStreamAtom',
    default: '',
});

export const activeRecipeResponseAtom = atom<string>({
    key: 'activeRecipeStreamDataAtom',
    default: '',
});

export const allBrokersSelector = selector<BrokerValue[]>({
    key: 'allBrokersSelector',
    get: ({get}) => {
        const brokers = get(brokersAtom);
        return brokers;
    },
});
export const brokersAtom = atom<BrokerValue[]>({
    key: 'brokersAtom',
    default: [],
});

const brokerIdsAtom = atom<string[]>({
    key: 'brokerIdsAtom',
    default: [],
});

