import React from "react";

export default function AverageLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-full w-full flex gap-5 px-20 py-6 flex-col items-start">
            {children}
        </main>
    )

}
