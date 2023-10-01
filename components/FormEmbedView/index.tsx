"use client";

import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitEmbed } from "../SubmitEmbed";

type FormEmbedViewState = {
    isLoading: boolean;
    isError: boolean;
};

export type FormEmbedViewProps = {
    id: string;
};

export const FormEmbedView: FC<FormEmbedViewProps> = ({ id }) => {
    const router = useRouter();

    const [formState, setFormState] = useState<FormEmbedViewState>({
        isLoading: false,
        isError: false,
    });

    async function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setFormState((state) => ({
            ...state,
            isLoading: true,
            isError: false,
        }));

        try {
            const resp = await fetch(e.currentTarget.action, {
                body: formData,
                cache: "no-cache",
                method: "POST",
            });

            if (resp.status !== 200) throw new Error("Invalid status code.");

            router.push(`/embed/${id}?status=done`);
        } catch (error: any) {
            setFormState((state) => ({
                ...state,
                isError: true,
            }));

            router.push(`/embed/${id}?status=error`);
        } finally {
            setFormState((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    }

    return (
        <form
            method={"POST"}
            action={"/api/form/embed"}
            className={
                "flex h-full w-full flex-col justify-center gap-2 bg-[#F5F5F5] p-3"
            }
            onSubmit={handleOnSubmit}
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
            <input type={"hidden"} name={"id"} value={id} />
            <section
                className={"flex flex-col gap-5 md:flex-row md:items-center"}
            >
                <SubmitEmbed isPending={formState.isLoading}>
                    Записаться на демо
                </SubmitEmbed>
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
};
