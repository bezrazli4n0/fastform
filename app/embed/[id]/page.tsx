import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { FormEmbedView } from "@/components";

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

    return <FormEmbedView id={params.id} />;
}
