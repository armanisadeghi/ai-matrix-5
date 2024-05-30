import { NextRequest, NextResponse } from 'next/server';

export async function insertChatData(collection: any, req: NextRequest): Promise<any> {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const { historyData } = await req.json();

    try {
        const newData = {
            user_id: userId,
            history: historyData
        };
        const insertResult = await collection.insertOne(newData);
        if (insertResult.insertedId) {
            return NextResponse.json({
                ...newData,
                _id: insertResult.insertedId
            });
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function getChatData(collection: any, req: NextRequest): Promise<any> {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        const result = await collection.findOne({ user_id: userId });
        if (result) {
            return NextResponse.json({ result });
        } else {
            return NextResponse.json({ error: 'Chat data not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function updateChatData(collection: any, req: NextRequest): Promise<any> {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const { historyData } = await req.json();

    if (!historyData) {
        return NextResponse.json({ error: 'Missing history data' }, { status: 400 });
    }

    try {
        const filter = { user_id: userId };
        const updateDocument = { $set: { history: historyData } };

        const result = await collection.updateOne(filter, updateDocument);

        if (result.matchedCount > 0) {
            return NextResponse.json({ result: 'Chat data updated successfully' });
        } else {
            return NextResponse.json({ error: 'Chat data not found' }, { status: 404 });
        }
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function removeChatData(collection: any, req: NextRequest): Promise<any> {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        const result = await collection.deleteOne({ user_id: userId });

        if (result.deletedCount > 0) {
            return NextResponse.json({ result: 'Chat data removed successfully' });
        } else {
            return NextResponse.json({ error: 'Chat data not found' }, {status: 404});
        }
    } catch (error) {
        return NextResponse.json({ error });
    }
}