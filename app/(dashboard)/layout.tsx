import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader, Navbar, Provider } from "@/components";

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
            <Provider>
                <body
                    className={`${inter.className} h-[100dvh] w-[100dvw] bg-[#27252B]`}
                >
                    <ClerkLoaded>
                        <Navbar />
                        {children}
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader />
                    </ClerkLoading>
                </body>
            </Provider>
        </html>
    );
}
