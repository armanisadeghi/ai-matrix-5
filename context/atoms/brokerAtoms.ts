import { Broker, Component } from '@/types/broker';
import { RecoilState, atom, atomFamily, selector, selectorFamily, useRecoilValue } from 'recoil';

export const brokersAtom = atom<Broker[]>({
    key: 'brokersAtom',
    default: [],
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
        item.dataType.toLowerCase().includes(filtering.toLowerCase()) &&
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

export const selectedComponentSelector = selectorFamily<Component, string>({
    key: 'SelectedComponentSelector',
    get: (id) => ({ get }) => {
        const component = get(componentAtomFamily(id));
        return component;
    },
});
