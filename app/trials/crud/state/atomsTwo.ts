import { atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilState } from 'recoil';
import { writableArray, writableObject, number, string } from '@recoiljs/refine';
import { syncEffect } from 'recoil-sync';

// Define the types for each atom family
type TableListItems = any[];
type CategoryItems = any[];
type SubCategoryItems = any[];
type LeftPaneWidth = number;
type TableMaxRows = number;
type TableHeaderMap = { [key: string]: string };
type DataFetch = any; // Adjust the type according to the fetched data structure
type Link = string | null;

// Sync effect with generic type
const syncEffectWithType = <T>(itemKey: (id: string) => string) => (id: string) =>
    syncEffect<T>({
        itemKey: itemKey(id),
        //@ts-ignore
        refine: (value: unknown): T => (value as T) || ([] as unknown as T),
    });

// Table List Items
export const tableListItemsFamily = atomFamily<TableListItems, string>({
    key: 'tableListItems',
    default: [],
    effects: (id) => [syncEffectWithType<TableListItems>((id) => `tableListItems-${id}`)(id)],
});

// Category Items
export const categoryItemsFamily = atomFamily<CategoryItems, string>({
    key: 'categoryItems',
    default: [],
    effects: (id) => [syncEffectWithType<CategoryItems>((id) => `categoryItems-${id}`)(id)],
});

// Sub Category Items
export const subCategoryItemsFamily = atomFamily<SubCategoryItems, string>({
    key: 'subCategoryItems',
    default: [],
    effects: (id) => [syncEffectWithType<SubCategoryItems>((id) => `subCategoryItems-${id}`)(id)],
});

// Left Pane Width
export const leftPaneWidthFamily = atomFamily<LeftPaneWidth, string>({
    key: 'leftPaneWidth',
    default: 250,
    effects: (id) => [syncEffectWithType<LeftPaneWidth>((id) => `leftPaneWidth-${id}`)(id)],
});

// Table Max Rows
export const tableMaxRowsFamily = atomFamily<TableMaxRows, string>({
    key: 'tableMaxRows',
    default: 10,
    effects: (id) => [syncEffectWithType<TableMaxRows>((id) => `tableMaxRows-${id}`)(id)],
});

// Table Header Map
export const tableHeaderMapFamily = atomFamily<TableHeaderMap, string>({
    key: 'tableHeaderMap',
    default: {},
    effects: (id) => [syncEffectWithType<TableHeaderMap>((id) => `tableHeaderMap-${id}`)(id)],
});

// Data Fetch
export const dataFetchFamily = atomFamily<DataFetch, string>({
    key: 'dataFetch',
    default: async (params: string) => {
        const response = await fetch(`/api/data?param=${params}`);
        return response.json();
    },
    //@ts-ignore
    effects: (id) =>
        syncEffect({
            itemKey: `dataFetch-${id}`,
            //@ts-ignore

            refine: async (value: unknown): Promise<DataFetch> => {
                if (value) return value as DataFetch;
                const response = await fetch(`/api/data?param=${id}`);
                return response.json();
            },
        }),
});

// Add Link
export const addLinkFamily = atomFamily<Link, string>({
    key: 'addLink',
    default: null,
    effects: (id) => [syncEffectWithType<Link>((id) => `addLink-${id}`)(id)],
});

// Delete Link
export const deleteLinkFamily = atomFamily<Link, string>({
    key: 'deleteLink',
    default: null,
    effects: (id) => [syncEffectWithType<Link>((id) => `deleteLink-${id}`)(id)],
});

// Edit Link
export const editLinkFamily = atomFamily<Link, string>({
    key: 'editLink',
    default: null,
    effects: (id) => [syncEffectWithType<Link>((id) => `editLink-${id}`)(id)],
});
