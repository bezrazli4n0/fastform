"use client";

import Image from "next/image";
import PepeSad from "@/public/pepe-sad.png";

export default function Error({ error }: { error: Error }) {
    return (
        <>
            <main
                className={
                    "flex flex-col items-center justify-center gap-7 p-6 pt-16"
                }
            >
                <Image src={PepeSad} alt={"Sad Pepe :("} width={500} />
                <h1 className={"text-2xl font-bold text-[#F4EDFF]"}>
                    Произошла ошибка 😔
                </h1>
                <p className={"text-md italic text-red-400"}>
                    `{error.message}`
                </p>
            </main>
        </>
    );
}
