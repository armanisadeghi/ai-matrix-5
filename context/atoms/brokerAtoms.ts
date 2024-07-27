import { Broker, Component } from '@/types/broker';
import { atom, selector, selectorFamily } from 'recoil';

export const brokersAtom = atom<Broker[]>({
    key: 'brokersAtom',
    default: [],
});

export const selectedBroker = atom<Broker>({
    key: 'selectedBroker',
    default: {} as Broker
})

export const brokerByIdSelector = selectorFamily<Broker | undefined, string>({
  key: 'brokerByIdSelector',
  get: (id: string) => ({ get }) => {
    const brokers = get(brokersAtom);
    return brokers.find((broker: Broker) => broker.id === id);
  },
});

export const brokerDataTypesAtom = atom<string[]>({
    key: 'brokerDataTypesAtom',
    default: [],
})

export const sortingAtom = atom<{
    column: 'displayName' | 'dataType' | 'componentType',
    direction: 'asc' | 'desc'
}>({
    key: 'sortingAtom',
    default: {
        column: 'displayName',
        direction: 'asc'
    }
});

export const filteringAtom = atom({
  key: 'filteringAtom',
  default: 'All', 
});

export const seachQueryAtom = atom({
  key: 'seachQueryAtom',
  default: '',
})

export const filteredAndSortedDataSelector = selector({
  key: 'filteredAndSortedDataSelector',
  get: ({ get }) => {
    const data = get(brokersAtom);
    const sorting = get(sortingAtom);
    const filtering = get(filteringAtom);
    const searchQuery = get(seachQueryAtom);

    let filteredData = data;

    if (filtering !== 'All') {
      filteredData = data.filter((item) =>
        item.dataType.toLowerCase().includes(filtering.toLowerCase()) 
      );
    } 

    if (searchQuery !== '') {
        filteredData = data.filter((item) => item.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sorting.column];
    const bValue = b[sorting.column];

    if (sorting.direction === 'asc') {
        return aValue.localeCompare(bValue);
    } else {
        return bValue.localeCompare(aValue);
    }
    });
        return sortedData;
    }
});

export const componentsAtom = atom<Component[] | []>({
    key: 'ComponentsAtom',
    default: [],
});

export const componentAtom = atom<Component>({
  key: 'componentAtom',
  default: {} as Component
});

export const componentSelector = selectorFamily({
  key: 'componentSelector',
  get: (id: string) => ({ get }) => {
    const components = get(componentsAtom);
    return components.find((component: Component) => component.id === id);
  },
});