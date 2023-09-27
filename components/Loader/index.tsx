import { FC } from "react";
import { LoaderIcon } from "lucide-react";

export const Loader: FC = () => (
    <main
        className={
            "flex h-full w-full flex-col items-center justify-center gap-2"
        }
    >
        <LoaderIcon
            className={"animate-spin"}
            width={64}
            height={64}
            color={"white"}
        />
        <h1 className={"text-center text-2xl font-bold text-[#F4EDFF]"}>
            Загружаемся.. <span className={"animate-ping"}>🚀</span>
        </h1>
    </main>
);
