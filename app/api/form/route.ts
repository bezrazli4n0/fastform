import { type NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const name = formData.get("name");
    const leadTarget = formData.get("leadTarget");

    const { userId } = getAuth(req);
    if (userId === null) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (name === null || leadTarget === null) {
        return NextResponse.json({ error: "Bad request." }, { status: 400 });
    }

    if (leadTarget === "Telegram") {
        const tgChatId = formData.get("tgChatId");
        if (tgChatId === null) {
            return NextResponse.json(
                { error: "Bad request." },
                { status: 400 }
            );
        }

        const { error, data } = await supabase
            .from("forms")
            .insert({
                userId,
                name: name.toString(),
                meta: {
                    chatId: tgChatId,
                },
                leadTarget: leadTarget.toString(),
            })
            .select();
        if (error !== null) {
            return NextResponse.json(
                { error: "Internal server error." },
                { status: 500 }
            );
        }

        const newForm = data[0] as unknown as {
            id: string;
            userId: string;
            createdAt: Date;
            name: string;
            meta: any;
            leadTarget: string;
        };

        return NextResponse.json(
            { status: "ok" },
            {
                status: 302,
                headers: {
                    Location: `/form/edit/${newForm.id}`,
                },
            }
        );
    } else {
        return NextResponse.json(
            { status: "Not Implemented." },
            {
                status: 501,
            }
        );
    }
}
