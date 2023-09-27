import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import { PlusIcon } from "lucide-react";

type CardHeadingProps = {
    children: ReactNode;
};

type CardDetailProps = {
    children: ReactNode;
};

type CardAddProps = {};

const CardHeading: FC<CardHeadingProps> = ({ children }) => (
    <h2
        className={
            "max-h-[180px] overflow-hidden text-lg font-bold text-[#F4EDFF]"
        }
    >
        {"“"}
        {children}
        {"”"}
    </h2>
);

const CardDetail: FC<CardDetailProps> = ({ children }) => (
    <p className={"text-sm text-[#F4EDFF] opacity-80"}>{children}</p>
);

const CardAdd: FC<CardAddProps> = () => (
    <section className={"flex items-center justify-center"}>
        <PlusIcon color={"#F4EDFF"} width={48} height={48} />
    </section>
);

export type CardProps = {
    children: ReactNode;
    isActive?: boolean;
};

export type CardExt = {
    Heading: FC<CardHeadingProps>;
    Detail: FC<CardDetailProps>;
    Add: FC<CardAddProps>;
};

export const Card: FC<CardProps> & CardExt = ({ children, isActive }) => {
    const styles = clsx(
        "max-h-[250px] min-h-[250px] overflow-hidden flex rounded-md flex-col gap-3 px-5 py-4 cursor-pointer justify-center",
        {
            "border border-[#F4EDFF] bg-[#6B16F4]":
                isActive !== undefined && isActive,
            "bg-[#47277A]": isActive === undefined || !isActive,
        }
    );

    return <section className={styles}>{children}</section>;
};
Card.Heading = CardHeading;
Card.Detail = CardDetail;
Card.Add = CardAdd;
