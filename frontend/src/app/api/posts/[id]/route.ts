import { NextResponse } from "next/server";

const INTERNAL_API_URL = process.env.INTERNAL_API_URL || "http://localhost:8080";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const body = await request.json();
        const res = await fetch(`${INTERNAL_API_URL}/api/posts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Update failed" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const res = await fetch(`${INTERNAL_API_URL}/api/posts/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Delete failed" }, { status: res.status });
        }

        return new Response(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
