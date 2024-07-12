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

// Table List Items

export const tableListItemsFamily = atomFamily<TableListItems, string>({
    key: 'tableListItems',
    default: [],
    effects: (id) => [
        syncEffect({
            itemKey: `tableListItems-${id}`,
            // @ts-ignore
            refine: (value) => value || [],  // Optional: add validation or transformation logic
        }),
    ],
});

// Category Items
// @ts-ignore
export const categoryItemsFamily = atomFamily<CategoryItems, string>({
    key: 'categoryItems',
    default: [],
    effects: (id) => [
        syncEffect({
            itemKey: `categoryItems-${id}`,
            // @ts-ignore
            refine: (value) => value || [],
        }),
    ],
});

// Sub Category Items
// @ts-ignore
export const subCategoryItemsFamily = atomFamily<SubCategoryItems, string>({
    key: 'subCategoryItems',
    default: [],
    effects: (id) => [
        syncEffect({
            itemKey: `subCategoryItems-${id}`,
            // @ts-ignore
            refine: (value) => value || [],
        }),
    ],
});

// Left Pane Width
// @ts-ignore
export const leftPaneWidthFamily = atomFamily<LeftPaneWidth, string>({
    key: 'leftPaneWidth',
    default: 250,
    effects: (id) => [
        syncEffect({
            itemKey: `leftPaneWidth-${id}`,
            // @ts-ignore
            refine: (value) => value || 250,
        }),
    ],
});

// Table Max Rows
// @ts-ignore
export const tableMaxRowsFamily = atomFamily<TableMaxRows, string>({
    key: 'tableMaxRows',
    default: 10,
    effects: (id) => [
        syncEffect({
            itemKey: `tableMaxRows-${id}`,
            // @ts-ignore
            refine: (value) => value || 10,
        }),
    ],
});

// Table Header Map
// @ts-ignore
export const tableHeaderMapFamily = atomFamily<TableHeaderMap, string>({
    key: 'tableHeaderMap',
    default: {},
    effects: (id) => [
        syncEffect({
            itemKey: `tableHeaderMap-${id}`,
            // @ts-ignore
            refine: (value) => value || {},
        }),
    ],
});

// Data Fetch
// @ts-ignore
export const dataFetchFamily = atomFamily<DataFetch, string>({
    key: 'dataFetch',
    default: async (params: any) => {
        const response = await fetch(`/api/data?param=${params}`);
        return response.json();
    },
    effects: (id) => [
        syncEffect({
            itemKey: `dataFetch-${id}`,
            // @ts-ignore
            refine: async (value) => {
                if (value) return value;
                const response = await fetch(`/api/data?param=${id}`);
                return response.json();
            },
        }),
    ],
});

// Add Link
// @ts-ignore
export const addLinkFamily = atomFamily<Link, string>({
    key: 'addLink',
    default: null,
    effects: (id) => [
        syncEffect({
            itemKey: `addLink-${id}`,
            // @ts-ignore
            refine: (value) => value || null,
        }),
    ],
});

// Delete Link
// @ts-ignore
export const deleteLinkFamily = atomFamily<Link, string>({
    key: 'deleteLink',
    default: null,
    effects: (id) => [
        syncEffect({
            itemKey: `deleteLink-${id}`,
            // @ts-ignore
            refine: (value) => value || null,
        }),
    ],
});

// Edit Link
// @ts-ignore
export const editLinkFamily = atomFamily<Link, string>({
    key: 'editLink',
    default: null,
    effects: (id) => [
        syncEffect({
            itemKey: `editLink-${id}`,
            // @ts-ignore
            refine: (value) => value || null,
        }),
    ],
});
