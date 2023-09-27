import { FC, TextareaHTMLAttributes } from "react";

export type TextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className"
> & {};

export const TextArea: FC<TextAreaProps> = ({ ...textAreaProps }) => (
    <textarea
        className={
            "w-full rounded-md bg-[#F4EDFF] px-3 py-2 text-sm text-[#27252B] placeholder-opacity-80 outline-none"
        }
        {...textAreaProps}
    ></textarea>
);
