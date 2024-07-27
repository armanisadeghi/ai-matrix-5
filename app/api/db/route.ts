import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import supabase from "@/utils/supabase/client";
import { transformData } from '@/utils/transforms';
import { v4 as uuidv4 } from 'uuid';

type DatabaseError = {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
};

type QueryParams = {
    [key: string]: string | undefined;
};

type BodyParams = {
    [key: string]: any;
};

async function handleRequest(
    method: string,
    table: string,
    queryParams: QueryParams,
    bodyParams: BodyParams = {}
) {
    console.log(`handleRequest called with method: ${method}, table: ${table}, queryParams: ${JSON.stringify(queryParams)}, bodyParams: ${JSON.stringify(bodyParams)}`);

    try {
        let data;
        let error: DatabaseError | null = null;

        // Transform query parameters if necessary
        const transformedQueryParams = Object.keys(queryParams).reduce((acc, key) => {
            const transformed = transformData(table, 'toBackend', { [key]: queryParams[key] });
            acc[key] = transformed[key];
            return acc;
        }, {} as QueryParams);

        console.log(`Transformed queryParams: ${JSON.stringify(transformedQueryParams)}`);

        switch (method) {
            case 'GET':
                const { selectColumns = '*', filterColumn, filterValue } = transformedQueryParams;
                console.log(`GET request with selectColumns: ${selectColumns}, filterColumn: ${filterColumn}, filterValue: ${filterValue}`);

                let query = supabase.from("chats").select(selectColumns as string);
                if (filterColumn && filterValue) {
                    query = query.eq(filterColumn as string, filterValue as string);
                }
                ({ data, error } = await query);

                console.log(`GET response data: ${JSON.stringify(data)}, error: ${JSON.stringify(error)}`);

                if (error) {
                    return NextResponse.json({ error: error.message }, { status: 404 });
                }

                if (data) {

                const transformedData = data.map((record: any) => transformData(table, 'toFrontend', record));
                console.log(`Transformed data: ${JSON.stringify(transformedData)}`);
                return NextResponse.json(transformedData, { status: 200 });
            }

            case 'POST':
                const transformedBodyParams = transformData(table, 'toBackend', bodyParams);
                console.log(`POST request with transformedBodyParams: ${JSON.stringify(transformedBodyParams)}`);
                ({ data, error } = await supabase.from("chats").insert(transformedBodyParams));

                console.log(`POST response data: ${JSON.stringify(data)}, error: ${JSON.stringify(error)}`);

                if (error) {
                    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
                }

                return NextResponse.json(data, { status: 201 });

            case 'DELETE':
                console.log(`DELETE request with transformedQueryParams: ${JSON.stringify(transformedQueryParams)}`);
                ({ error } = await supabase.from('chats').delete().match(transformedQueryParams));

                console.log(`DELETE response error: ${JSON.stringify(error)}`);

                if (error) {
                    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
                }

                return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });

            case 'PATCH':
                const updateRecord = transformData(table, 'toBackend', bodyParams);
                console.log(`PATCH request with updateRecord: ${JSON.stringify(updateRecord)}, transformedQueryParams: ${JSON.stringify(transformedQueryParams)}`);
                ({ data, error } = await supabase.from('chats').update(updateRecord).match(transformedQueryParams));

                console.log(`PATCH response data: ${JSON.stringify(data)}, error: ${JSON.stringify(error)}`);

                if (error) {
                    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
                }

                return NextResponse.json({ message: 'Item updated successfully' }, { status: 200 });

            default:
                return NextResponse.json({ error: 'Invalid method' }, { status: 405 });
        }
    } catch (error) {
        console.error(`handleRequest error: ${error}`);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const table = searchParams.get('table') || 'default_table';
    console.log(`GET request to table: ${table} with queryParams: ${JSON.stringify(queryParams)}`);
    return handleRequest('GET', table, queryParams);
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const bodyParams = await req.json();
    const table = searchParams.get('table') || 'default_table';
    console.log(`POST request to table: ${table} with queryParams: ${JSON.stringify(queryParams)}, bodyParams: ${JSON.stringify(bodyParams)}`);
    return handleRequest('POST', table, queryParams, bodyParams);
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const table = searchParams.get('table') || 'default_table';
    console.log(`DELETE request to table: ${table} with queryParams: ${JSON.stringify(queryParams)}`);
    return handleRequest('DELETE', table, queryParams);
}

export async function PATCH(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const bodyParams = await req.json();
    const table = searchParams.get('table') || 'default_table';
    console.log(`PATCH request to table: ${table} with queryParams: ${JSON.stringify(queryParams)}, bodyParams: ${JSON.stringify(bodyParams)}`);
    return handleRequest('PATCH', table, queryParams, bodyParams);
}

export async function OPTIONS(req: NextRequest) {
    const headers = new Headers();
    headers.set('Allow', 'GET, POST, DELETE, PATCH');
    return new NextResponse(null, { headers });
}
