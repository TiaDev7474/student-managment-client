import TableHeader from "@/components/table/header";
import React from "react";

type TableProps = {
    headers: string[],
    children: React.ReactNode
}
export default function Table({headers, children}: TableProps) {

    return(
        <div className="relative overflow-x-auto p-10 rounded-lg bg-[#282828]">
            <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHeader headers={headers} />
                <tbody>
                   {children}
                </tbody>
            </table>
        </div>

    )

}
