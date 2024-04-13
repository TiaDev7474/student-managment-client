import React  from "react";
import {className} from "postcss-selector-parser";

interface RowsProps{
    data?: any,
    children?: React.ReactNode,
    className?: string


}
export default function TableRow({data, children, className}: RowsProps) {
    return(

        <th
            scope="row"
            className={`${className} px-4 py-4  font-medium text-foreground whitespace-nowrap dark:text-foreground`}
        >
            {data && data}
            {children && children}
        </th>
    )
}
