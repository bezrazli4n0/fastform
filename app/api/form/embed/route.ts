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

    try {
        const { error, data } = await supabase
            .from("forms")
            .select()
            .eq("id", id);
        if (error !== null) {
            throw error;
        }

        const form = data[0] as unknown as Form;

        if (form.leadTarget === "Telegram") {
            const tgMeta = form.meta as unknown as {
                chatId: string;
            };

            const textFormatted = [...formData.entries()]
                .filter(([key]) => key !== "id")
                .map(([key, value]) => {
                    return `<b>${key}</b>\n<code>${value.toString()}</code>\n\n`;
                });

            const bot = new Telegraf(TG_BOT_TOKEN);
            await bot.telegram.sendMessage(
                tgMeta.chatId,
                textFormatted.join(""),
                {
                    parse_mode: "HTML",
                }
            );

            const { error: updateError } = await supabase
                .from("forms")
                .update({
                    leads: form.leads + 1,
                })
                .eq("id", id);
            if (updateError !== null) {
                throw updateError;
            }

            return NextResponse.json(
                { status: "ok" },
                {
                    status: 200,
                }
            );
        } else {
            throw new Error("Not Implemented.");
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error.", cause: JSON.stringify(error) },
            {
                status: 500,
            }
        );
    }
}
