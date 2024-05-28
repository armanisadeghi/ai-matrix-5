import type { NextApiRequest, NextApiResponse } from "next";
import { corsMiddleware } from "@/middleware/corsMiddleware";
import clientPromise from "@/lib/connectMongo";

async function insertChatData(collection: any, req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { userId } = req.query;
    const { historyData } = req.body;

    try {
        const newData = {
            user_id: userId,
            history: historyData
        };
        const insertResult = await collection.insertOne(newData);
        if (insertResult.insertedId) {
            res.status(200).json({
                ...newData,
                _id: insertResult.insertedId
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function getChatData(collection: any, req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { userId } = req.query;

    try {
        const result = await collection.findOne({ user_id: userId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Chat data not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
async function updateChatData(collection: any, req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { userId } = req.query;
    const { historyData } = req.body;

    if (!historyData) {
        res.status(400).json({ error: 'Missing history data' });
        return;
    }

    try {
        const filter = { user_id: userId };
        const updateDocument = { $set: { history: historyData } };

        const result = await collection.updateOne(filter, updateDocument);

        if (result.matchedCount > 0) {
            res.status(200).json({ result: 'Chat data updated successfully' });
        } else {
            res.status(404).json({ error: 'Chat data not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function removeChatData(collection: any, req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { userId } = req.query;

    try {
        const result = await collection.deleteOne({ user_id: userId });

        if (result.deletedCount > 0) {
            res.status(200).json({ result: 'Chat data removed successfully' });
        } else {
            res.status(404).json({ error: 'Chat data not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const client = await clientPromise;
    const collection = client.db('chat_ai').collection('chat');

    switch (req.method) {
        case 'GET':
            await getChatData(collection, req, res);
            break;
        case 'POST':
            await insertChatData(collection, req, res);
            break;
        case 'PUT':
            await updateChatData(collection, req, res);
            break;
        case 'DELETE':
            await removeChatData(collection, req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}

export default corsMiddleware(handler);