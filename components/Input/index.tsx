import { FC, InputHTMLAttributes } from "react";

export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className"
> & {};

export const Input: FC<InputProps> = ({ children, ...inputProps }) => (
    <input
        className={
            "rounded-md bg-[#F4EDFF] px-3 py-2 text-sm text-[#27252B] placeholder-opacity-80 outline-none"
        }
        {...inputProps}
    />
);
