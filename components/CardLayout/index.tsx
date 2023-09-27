import { FC, ReactNode } from "react";

export type CardLayoutProps = {
    children: ReactNode;
};

export const CardLayout: FC<CardLayoutProps> = ({ children }) => (
    <section
        className={
            "flex w-full flex-col gap-6 md:grid md:w-auto md:grid-cols-[repeat(3,_230px)]"
        }
    >
        {children}
    </section>
);
