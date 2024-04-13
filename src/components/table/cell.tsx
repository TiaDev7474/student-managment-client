import React from "react";

interface TableCellProps {
    children: React.ReactNode,
    className?: string

}
export default function TableCell(props: TableCellProps){
    const {className, children} = props
    return (
        <tr className={className}>
            {children}
        </tr>
    )
}
