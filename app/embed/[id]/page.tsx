import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export default function FormEmbed({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { status?: string };
}) {
    if (searchParams.status !== undefined) {
        if (searchParams.status === "done") {
            return (
                <main
                    className={
                        "flex h-full w-full flex-col items-center justify-center gap-2 bg-[#F5F5F5]"
                    }
                >
                    <CheckCircleIcon width={64} height={64} color={"green"} />
                    <h1 className={"text-center text-xl text-slate-500"}>
                        Заявка отправлена!
                    </h1>
                </main>
            );
        } else if (searchParams.status === "error") {
            return (
                <main
                    className={
                        "flex h-full w-full flex-col items-center justify-center gap-2 bg-[#F5F5F5]"
                    }
                >
                    <XCircleIcon width={64} height={64} color={"red"} />
                    <h1 className={"text-center text-xl text-slate-500"}>
                        Упс.., произошла ошибка 😔
                    </h1>
                </main>
            );
        }
    }

    return (
        <form
            method={"POST"}
            action={"/api/form/embed"}
            className={
                "flex h-full w-full flex-col justify-center gap-2 bg-[#F5F5F5]"
            }
        >
            <label className={"flex flex-col gap-[6px] text-sm text-[#0F172A]"}>
                Ваше имя
                <input
                    className={
                        "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-[#A1A1A1] outline-none"
                    }
                    name={"name"}
                    placeholder={"Петр Иванов"}
                    required
                />
            </label>
            <label className={"flex flex-col gap-[6px] text-sm text-[#0F172A]"}>
                Номер телефона
                <input
                    className={
                        "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-[#A1A1A1] outline-none"
                    }
                    name={"phone"}
                    placeholder={"+7-(123)-456-78-90"}
                    required
                />
            </label>
            <label className={"flex flex-col gap-[6px] text-sm text-[#0F172A]"}>
                Опишите вашу задачу
                <textarea
                    className={
                        "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-[#A1A1A1] outline-none"
                    }
                    name={"description"}
                    placeholder={
                        "У нас интернет магазин, в поддержке 30 человек. Хотим оптимизировать отдел саппорта."
                    }
                    required
                />
            </label>
            <input type={"hidden"} name={"id"} value={params.id} />
            <section
                className={"flex flex-col gap-5 md:flex-row md:items-center"}
            >
                <button
                    type={"submit"}
                    className={
                        "rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
                    }
                >
                    Записаться на демо
                </button>
                <p
                    className={
                        "text-center text-sm font-normal text-slate-500 md:text-left"
                    }
                >
                    После отправки формы
                    <br /> свяжемся с вами в мессенджере
                </p>
            </section>
        </form>
    );
}
