import { FC, ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonProps = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
> & {
    children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => (
    <button
        className={
            "w-full rounded-md bg-[#6B16F4] px-3 py-2 text-sm font-bold text-[#F4EDFF] outline-none hover:opacity-90"
        }
        {...buttonProps}
    >
        {children}
    </button>
);
