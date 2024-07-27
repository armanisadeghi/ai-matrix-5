import { brokerData } from '@/redux/features/broker/data';
import { BrokerValue } from '@/redux/features/broker/types';
import { brokerValueFamily, recipeBrokerAtomFamily } from '@/state/aiAtoms/recipeAtoms';
import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { recipeData } from '../components/recipeData';

export const useBrokers = () => {
    const loadRecipeBrokers = useRecoilCallback(({set, snapshot}) => (recipeId: string) => {
        const recipe = recipeData.find(r => r.id === recipeId);
        if (!recipe) return [];

        const neededBrokerIds = recipe.input_brokers;
        set(recipeBrokerAtomFamily(recipeId), neededBrokerIds);

        return neededBrokerIds.map((brokerId) => {
            const currentBroker = snapshot.getLoadable(brokerValueFamily(brokerId)).contents;
            if (currentBroker.officialName) {
                return currentBroker;
            } else {
                const brokerInfo = brokerData.find(b => b.id === brokerId);
                if (!brokerInfo) return currentBroker;
                const newBroker = {
                    id: brokerInfo.id,
                    officialName: brokerInfo.officialName,
                    name: brokerInfo.displayName,
                    tooltip: brokerInfo.tooltip,
                    value: brokerInfo.defaultValue,
                    dataType: brokerInfo.dataType,
                    ready: null,
                };
                set(brokerValueFamily(brokerId), newBroker);
                return newBroker;
            }
        });
    }, []);

    const switchRecipe = useRecoilCallback(({snapshot, set}) => (recipeId: string) => {
        loadRecipeBrokers(recipeId);
        const recipeBrokerIds = snapshot.getLoadable(recipeBrokerAtomFamily(recipeId)).contents;
        return recipeBrokerIds.map(brokerId => snapshot.getLoadable(brokerValueFamily(brokerId)).contents);
    }, [loadRecipeBrokers]);

    const updateBrokerValue = useRecoilCallback(({set}) => (brokerId: string, value: any) => {
        set(brokerValueFamily(brokerId), (currentState) => ({
            ...currentState,
            value,
            ready: true,
        }));
    }, []);

    const getRecipeBrokers = useCallback((recipeId: string) => {
        const brokerIds = useRecoilValue(recipeBrokerAtomFamily(recipeId));
        return brokerIds.map(id => useRecoilValue(brokerValueFamily(id)));
    }, []);

    const updateBroker = useRecoilCallback(({set}) => (brokerId: string, updates: Partial<BrokerValue>) => {
        set(brokerValueFamily(brokerId), (currentState) => ({
            ...currentState,
            ...updates,
        }));
    }, []);

    const getBrokerValue = useRecoilCallback(({snapshot}) => (brokerId: string) => {
        return snapshot.getLoadable(brokerValueFamily(brokerId)).contents;
    }, []);

    const setAllBrokersReady = useRecoilCallback(({set}) => (recipeId: string, readyState: boolean) => {
        const recipeBrokerIds = useRecoilValue(recipeBrokerAtomFamily(recipeId));
        recipeBrokerIds.forEach((brokerId) => {
            set(brokerValueFamily(brokerId), (currentState) => ({
                ...currentState,
                ready: readyState,
            }));
        });
    }, []);

    return {
        loadRecipeBrokers,
        switchRecipe,
        getRecipeBrokers,
        updateBroker,
        updateBrokerValue,
        getBrokerValue,
        setAllBrokersReady,
        brokerValueFamily,
    };
};
