import { Database, Tables, TablesInsert, TablesUpdate } from "@/types/engineDb.types";
import supabase from "./client";

export type TableNameType = string;
export type DataType = Record<string, any>;

export const createTable = async <T extends keyof Database["public"]["Tables"]>(
    tableName: T | any,
    data: TablesInsert<T>,
): Promise<Tables<T>> => {
    const { data: createdData, error } = await supabase.from(tableName).insert(data).single();

    if (error) {
        throw new Error(`Error creating data in ${tableName}: ${error.message}`);
    }

    return createdData as Tables<T>;
};

export const getTableData = async <T extends keyof Database["public"]["Tables"]>(
    tableName: T | any,
    filter?: Partial<Tables<T>>,
): Promise<Tables<T>[]> => {
    let query = supabase.from(tableName).select("*");

    if (filter) {
        Object.keys(filter).forEach((key) => {
            query = query.eq(key as string, filter[key as keyof Tables<T>]);
        });
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
    }

    return data as Tables<T>[];
};

export const updateTableData = async <T extends keyof Database["public"]["Tables"]>(
    tableName: T | any,
    id: number,
    data: TablesUpdate<T>,
): Promise<void> => {
    const { error } = await supabase.from(tableName).update(data).eq("id", id);

    if (error) {
        throw new Error(`Error updating data in ${tableName}: ${error.message}`);
    }
};

export const deleteTableData = async <T extends keyof Database["public"]["Tables"]>(
    tableName: T | any,
    id: number,
): Promise<void> => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);

    if (error) {
        throw new Error(`Error deleting data from ${tableName}: ${error.message}`);
    }
};
