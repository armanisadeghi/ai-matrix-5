import { Broker, Component } from '@/types/broker';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

export const brokersAtom = atom<Broker[]>({
    key: 'brokersAtom',
    default: [],
});

export const brokerByIdSelector = selector({
  key: 'brokerByIdSelector',
  get: ({ get }) => (id: string) => {
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

export const componentsAtom = atom<Component[]>({
    key: 'ComponentsAtom',
    default: [],
});

export const selectedComponentSelector = selectorFamily<Component, string>({
    key: 'SelectedComponentSelector',
    get: (id) => ({ get }) => {
        const components = get(componentsAtom);
        return components.find((component) => component.id === id) || componentAtomFamily(id);
    },
});

export const componentAtomFamily = atomFamily<Component, string>({
    key: 'ComponentAtomFamily',
    default: (id) => ({
        id: id,
        type: 'input',
        defaultValue: '',
        description: '',
        options: [],
        placeholder: '',
        label: '',
        required: false,
        validation: false,
        tooltip: '',
        withArrow: false,
    }),
});
