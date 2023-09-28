import { headers } from "next/headers";
import { TextArea, Button } from "@/components";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

async function getFormData(id: string) {
    const { error, data } = await supabase
        .from("forms")
        .select("name")
        .eq("id", id);
    if (error !== null) throw new Error("Invalid db call.");

    const formName = data[0].name as unknown as string;
    return formName;
}

export default async function Form({ params }: { params: { id: string } }) {
    const formName = await getFormData(params.id);
    const host = headers().get("Host");

    return (
        <>
            <main
                className={
                    "flex flex-col items-center justify-center p-6 pt-16"
                }
            >
                <section className={"flex w-full flex-col gap-7 md:max-w-lg"}>
                    <h1 className={"text-2xl font-bold text-[#F4EDFF]"}>
                        {"“"}
                        {formName}
                        {"”"}
                    </h1>
                    <TextArea
                        defaultValue={`<iframe src="https://${host}/embed/${params.id}" width="530px" height="320px"></iframe>`}
                        readOnly
                    />
                    <section className={"flex flex-col gap-2"}>
                        <form
                            method={"POST"}
                            action={"/api/form/delete"}
                            className={"w-full"}
                        >
                            <input
                                type={"hidden"}
                                name={"id"}
                                value={params.id}
                            />
                            <Button type={"submit"}>Удалить</Button>
                        </form>
                        <Link
                            href={`/embed/${params.id}`}
                            target={"_blank"}
                            className={"w-full"}
                        >
                            <Button>Открыть форму</Button>
                        </Link>
                    </section>
                </section>
            </main>
        </>
    );
}
