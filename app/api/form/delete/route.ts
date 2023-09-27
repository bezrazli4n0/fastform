import { type NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const id = formData.get("id");

    const { userId } = getAuth(req);
    if (userId === null) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (id === null) {
        return NextResponse.json({ error: "Bad request." }, { status: 400 });
    }

    const { error: selectError, data } = await supabase
        .from("forms")
        .select("userId")
        .eq("id", id);
    if (selectError !== null) {
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }

    if ((data[0].userId as unknown as string) !== userId) {
        return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { error } = await supabase.from("forms").delete().eq("id", id);
    if (error !== null) {
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { status: "ok" },
        {
            status: 302,
            headers: {
                Location: `/`,
            },
        }
    );
}
