import Link from "next/link";
import { Card, CardLayout } from "@/components";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

async function getUserForms(userId: string): Promise<
    {
        name: string;
        leads: number;
        id: string;
        leadTarget: string;
    }[]
> {
    const { error, data } = await supabase
        .from("forms")
        .select()
        .eq("userId", userId);
    if (error !== null) throw new Error("Invalid db call.");

    return data;
}

export default async function Dashboard() {
    const { userId } = auth();
    if (userId === null) throw new Error("Unauthorized.");

    const userForms = await getUserForms(userId);

    return (
        <>
            <main
                className={
                    "flex flex-col items-center justify-center gap-7 p-6"
                }
            >
                <h1 className={"text-xl font-bold text-[#F4EDFF]"}>
                    Ваши формы:
                </h1>
                <CardLayout>
                    {userForms.map((userForm, index) => (
                        <Link href={`/form/edit/${userForm.id}`} key={index}>
                            <Card>
                                <Card.Heading>{userForm.name}</Card.Heading>
                                <Card.Detail>
                                    Отправка: {userForm.leadTarget}
                                </Card.Detail>
                                <Card.Detail>
                                    Заявок: {userForm.leads}
                                </Card.Detail>
                            </Card>
                        </Link>
                    ))}
                    <Link href={"/form"}>
                        <Card isActive>
                            <Card.Add />
                        </Card>
                    </Link>
                </CardLayout>
            </main>
        </>
    );
}
