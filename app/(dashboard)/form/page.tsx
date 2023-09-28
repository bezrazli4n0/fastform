import { Input, Button, Select } from "@/components";
import Link from "next/link";

export default function Form() {
    return (
        <>
            <main
                className={
                    "flex flex-col items-center justify-center gap-7 p-6 pt-16"
                }
            >
                <h1 className={"text-2xl font-bold text-[#F4EDFF]"}>
                    Создать новую форму
                </h1>
                <form
                    method={"POST"}
                    action={"/api/form"}
                    className={
                        "grid w-full grid-cols-[min-content_auto] items-center gap-2 whitespace-nowrap p-3 md:max-w-lg"
                    }
                >
                    <label className={"text-sm text-[#F4EDFF]"}>
                        Название:
                    </label>
                    <Input name={"name"} required placeholder={"Лендинг~1"} />
                    <label
                        className={"text-sm text-[#F4EDFF]"}
                        htmlFor={"formTarget"}
                    >
                        Заявки в:
                    </label>
                    <Select name={"leadTarget"} defaultValue={"Telegram"}>
                        <option value={"Telegram"}>Telegram</option>
                    </Select>
                    <label className={"text-sm text-[#F4EDFF]"}>Чат-ID:</label>
                    <Input
                        name={"tgChatId"}
                        required
                        placeholder={"123456789.."}
                    />
                    <section className={"col-span-2"}>
                        <Button type={"submit"}>Создать!</Button>
                    </section>
                    <p
                        className={
                            "col-span-2 text-center text-xs font-normal text-[#F4EDFF] opacity-75"
                        }
                    >
                        * Обязательно добавьте бота в свой чат,
                        <br /> чтобы получать заявки{" "}
                        <Link
                            href={"https://t.me/fastform_bot"}
                            target={"_blank"}
                            className={"font-bold text-[#E8DCFC] underline"}
                        >
                            @fastform_bot
                        </Link>
                    </p>
                </form>
            </main>
        </>
    );
}
