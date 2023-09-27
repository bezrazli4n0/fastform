import { FC, SelectHTMLAttributes, ReactNode } from "react";

export type SelectProps = Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "className"
> & {
    children: ReactNode;
};

type SelectExt = {};

export const Select: FC<SelectProps> & SelectExt = ({
    children,
    ...selectProps
}) => (
    <select
        className={
            "rounded-md bg-[#F4EDFF] px-3 py-2 text-sm text-[#27252B] outline-none"
        }
        {...selectProps}
    >
        {children}
    </select>
);
