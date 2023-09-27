import { type NextRequest, NextResponse } from "next/server";
import { Telegraf } from "telegraf";
import { supabase } from "@/lib/supabase";

const TG_BOT_TOKEN: string = process.env.TG_BOT_TOKEN || "";

type Form = {
    id: string;
    createdAt: Date;
    name: string;
    meta: any;
    leadTarget: string;
    userId: string;
    leads: number;
};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const id = formData.get("id");
    if (id === null) {
        return NextResponse.json({ error: "Bad request." }, { status: 400 });
    }

    const { error, data } = await supabase.from("forms").select().eq("id", id);
    if (error !== null) {
        return NextResponse.json(
            {
                error: "Internal server error.",
                cause: JSON.stringify(error),
            },
            {
                status: 500,
                headers: {
                    Location: `/embed/${id}?status=error`,
                },
            }
        );
    }

    const form = data[0] as unknown as Form;

    if (form.leadTarget === "Telegram") {
        const tgMeta = form.meta as unknown as {
            chatId: string;
        };

        const bot = new Telegraf(TG_BOT_TOKEN);
        await bot.telegram.sendMessage(
            tgMeta.chatId,
            `\`\`\`json\n${JSON.stringify(
                Object.fromEntries(formData.entries()),
                null,
                2
            )}\`\`\``,
            { parse_mode: "MarkdownV2" }
        );

        const { error: updateError } = await supabase
            .from("forms")
            .update({
                leads: form.leads + 1,
            })
            .eq("id", id);
        if (updateError !== null) {
            return NextResponse.json(
                {
                    error: "Internal server error.",
                    cause: JSON.stringify(updateError),
                },
                {
                    status: 500,
                    headers: {
                        Location: `/embed/${id}?status=error`,
                    },
                }
            );
        }

        return NextResponse.json(
            { status: "ok" },
            {
                status: 302,
                headers: {
                    Location: `/embed/${id}?status=done`,
                },
            }
        );
    } else {
        return NextResponse.json(
            { status: "Not Implemented." },
            {
                status: 501,
                headers: {
                    Location: `/embed/${id}?status=error`,
                },
            }
        );
    }
}
