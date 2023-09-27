import { FC } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export type NavbarProps = {};

export const Navbar: FC<NavbarProps> = () => (
    <nav
        className={
            "flex flex-row-reverse items-center justify-between px-7 py-6"
        }
    >
        <UserButton />
        <Link href={"/"} className={"text-xl font-light text-[#F4EDFF]"}>
            <span className={"text-xl font-bold text-[#6B16F4]"}>Fast</span>
            Form
        </Link>
    </nav>
);
