import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const payload = await req.json();

        console.log("Payload:", payload); // Debugging: Ensure payload is correct

        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");

        const response = await fetch("https://api.jdoodle.com/v1/execute", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: myHeaders,
            redirect: "follow",
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (err) {
        console.log("Error:", err.message);
        return NextResponse.error();
    }
}
