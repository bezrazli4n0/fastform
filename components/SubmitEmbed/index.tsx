import { FC, ReactNode } from "react";
import { Loader2Icon } from "lucide-react";
import { clsx } from "clsx";

export type SubmitEmbedProps = {
    children: ReactNode;
    isPending?: boolean;
};

export const SubmitEmbed: FC<SubmitEmbedProps> = ({ children, isPending }) => {
    const pending = isPending !== undefined && isPending;

    return (
        <button
            type={"submit"}
            className={clsx(
                "rounded-md px-4 py-2 text-sm text-white hover:opacity-90",
                {
                    "bg-slate-500": pending,
                    "bg-slate-900": !pending,
                }
            )}
            aria-disabled={pending}
            disabled={pending}
        >
            <section className={"flex items-center justify-center"}>
                {pending ? (
                    <Loader2Icon className={"animate-spin"} />
                ) : (
                    children
                )}
            </section>
        </button>
    );
};
