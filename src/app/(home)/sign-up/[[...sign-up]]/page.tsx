"use client";

import { SignUp } from "@clerk/nextjs";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { dark } from "@clerk/themes";

const Page = () => {
    const currentTheme = useCurrentTheme();

    return (
        <div className="flex flex-col max-e-3xl mx-auto w-full">
            <section className="space-y-6 pt-[16vh] 2xl:t-48">
                <div className="flex flex-col items-center">
                   <SignUp
                       appearance={{
                           baseTheme: currentTheme === "dark" ? dark : undefined,
                            elements: {
                                 cardox: "border! shadow-none! rounded-lg!",
                            },
                       }}
                   />
                </div>
            </section>
        </div>
    );
}

export default Page;