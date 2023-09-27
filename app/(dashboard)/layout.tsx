import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";
import { Loader } from "@/components";

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
            <ClerkProvider
                localization={ruRU}
                appearance={{
                    elements: {
                        formButtonPrimary: {
                            backgroundColor: "#6B16F4",
                            "&:hover, &:focus": {
                                backgroundColor: "#7a2df5",
                            },
                            "&:active": {
                                backgroundColor: "#6014dc",
                            },
                        },
                        footerActionLink: {
                            color: "#6B16F4",
                            "&:hover, &:focus": {
                                color: "#7a2df5",
                            },
                        },
                    },
                }}
            >
                <body
                    className={`${inter.className} h-[100dvh] w-[100dvw] bg-[#27252B]`}
                >
                    <ClerkLoaded>{children}</ClerkLoaded>
                    <ClerkLoading>
                        <Loader />
                    </ClerkLoading>
                </body>
            </ClerkProvider>
        </html>
    );
}
