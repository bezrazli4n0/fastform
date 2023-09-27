import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FastForm - создавай формы",
    description: "Конструктор онлайн форм для сбора данных ✨",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} h-[100dvh] w-[100dvw] bg-[#27252B]`}
            >
                {children}
            </body>
        </html>
    );
}
