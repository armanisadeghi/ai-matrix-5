// app/api/playground/route.ts

import { NextRequest } from 'next/server';
import { routeGET, routePUT, routePOST, routeDELETE } from '@/middleware/routeMiddleware';

export async function GET(req: NextRequest) {
    return routeGET(req, "matrixMongo", "playgroundData");
}

export async function PUT(req: NextRequest) {
    return routePUT(req, "matrixMongo", "playgroundData");
}

export async function POST(req: NextRequest) {
    return routePOST(req, "matrixMongo", "playgroundData");
}

export async function DELETE(req: NextRequest) {
    return routeDELETE(req, "matrixMongo", "playgroundData");
}