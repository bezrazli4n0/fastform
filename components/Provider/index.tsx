import { FC, ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ruRU } from "@clerk/localizations";

export type ProviderProps = {
    children: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => {
    return (
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
            {children}
        </ClerkProvider>
    );
};
