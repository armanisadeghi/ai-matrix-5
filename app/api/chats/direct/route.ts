import "server-only";
import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

// OPTIMIZE: errors in this file causing build errors

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const chat_id = searchParams.get("chat_id");

    if (!user_id) {
        return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    if (chat_id) {
        // Handle specific chat retrieval
        const { data, error } = await supabase.from("chats").select("messages_array").eq("chat_id", chat_id).single();

        if (error) {
            return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        return NextResponse.json(data.messages_array, { status: 200 });
    } else {
        // Handle retrieval of all chats
        const { data, error } = await supabase.from("chats").select("chat_id, chat_title").eq("user_id", user_id);

        if (error) {
            return NextResponse.json({ error: "Error retrieving chats" }, { status: 500 });
        }

        const chats = data.map((chat: { chat_id: string; chat_title: string }) => ({
            chat_id: chat.chat_id,
            chat_title: chat.chat_title,
        }));

        return NextResponse.json(chats, { status: 200 });
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const { chat_id, role, text, title } = await req.json();

    if (!user_id || !role || !text || (role === "user" && !chat_id)) {
        return NextResponse.json(
            { error: "user_id, role, text, and (chat_id for user messages) are required" },
            { status: 400 },
        );
    }

    if (chat_id) {
        // Handle adding a message to an existing chat
        const { data, error } = await supabase.from("chats").select("messages_array").eq("chat_id", chat_id).single();

        if (error) {
            return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        const messages = data.messages_array;
        messages.push({ role, text });

        const { error: updateError } = await supabase
            .from("chats")
            .update({ messages_array: messages })
            .eq("chat_id", chat_id);

        if (updateError) {
            return NextResponse.json({ message: "Failed to add message" }, { status: 500 });
        }

        return NextResponse.json({ message: "Message added successfully" }, { status: 201 });
    } else if (role === "system" && title) {
        // Handle creating a new chat
        const { data, error } = await supabase.from("chats").insert({
            chat_id: uuidv4(),
            chat_title: title,
            user_id: user_id,
            created_at: new Date(),
            last_edited: new Date(),
            messages_array: [{ roleType: "system", text }],
        });

        if (error) {
            return NextResponse.json({ message: "Failed to create chat" }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } else {
        return NextResponse.json(
            { error: "title is required for creating a new chat with a system message" },
            { status: 400 },
        );
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const chat_id = searchParams.get("chat_id");

    if (!user_id || !chat_id) {
        return NextResponse.json({ error: "user_id and chat_id are required" }, { status: 400 });
    }

    const { error } = await supabase.from("chats").delete().eq("chat_id", chat_id);

    if (error) {
        return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Chat deleted successfully" }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const { chat_id, index, text } = await req.json();

    if (!user_id || !chat_id || index == null || !text) {
        return NextResponse.json({ error: "user_id, chat_id, index, and text are required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("chats").select("messages_array").eq("chat_id", chat_id).single();

    if (error) {
        return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const messages = data.messages_array;
    if (index < 0 || index >= messages.length) {
        return NextResponse.json({ message: "Message index out of range" }, { status: 400 });
    }

    messages[index].text = text;

    const { error: updateError } = await supabase
        .from("chats")
        .update({ messages_array: messages })
        .eq("chat_id", chat_id);

    if (updateError) {
        return NextResponse.json({ message: "Failed to edit message" }, { status: 500 });
    }

    return NextResponse.json({ message: "Message edited successfully" }, { status: 200 });
}

export async function POST_reset(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const { chat_id, index } = await req.json();

    if (!user_id || !chat_id || index == null) {
        return NextResponse.json({ error: "user_id, chat_id, and index are required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("chats").select("messages_array").eq("chat_id", chat_id).single();

    if (error) {
        return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const messages = data.messages_array.slice(0, index + 1);

    const { error: updateError } = await supabase
        .from("chats")
        .update({ messages_array: messages })
        .eq("chat_id", chat_id);

    if (updateError) {
        return NextResponse.json({ message: "Failed to reset chat" }, { status: 500 });
    }

    return NextResponse.json({ message: "Chat reset successfully" }, { status: 200 });
}

export async function OPTIONS(req: NextRequest) {
    const headers = new Headers();
    headers.set("Allow", "GET, POST, DELETE, PATCH");
    return new NextResponse(null, { headers });
}
