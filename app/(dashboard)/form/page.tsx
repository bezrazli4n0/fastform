import { Input, Button, Select, Navbar } from "@/components";

export default function Form() {
    return (
        <>
            <Navbar />
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
                        "grid grid-cols-[min-content_auto] gap-2 whitespace-nowrap p-3"
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
                        placeholder={"13371337.."}
                    />
                    <section className={"col-span-2"}>
                        <Button type={"submit"}>Создать!</Button>
                    </section>
                </form>
            </main>
        </>
    );
}
