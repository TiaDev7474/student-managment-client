"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface LinkProps {
    href: string,
    title: string,
    icon?: React.ReactNode
}
export default function CustomLink({href, title, icon}: LinkProps){
    const params = usePathname();
    return (
        <Link href={href} className={`${params == href ? 'border-b-primary border-b-2 group text-primary': " group hover:border-b-primary hover:border-b-2"} "group hover:border-b-primary  w-fit h-fit py-5 px-3 hover:border-b-2" `}>
             <li className="flex justify-center items-center  gap-2 group-hover:text-primary transition-colors ">
                 {icon}
                 <div className=" flex relative h-fit overflow-hidden">
                     <span className="text-sm  group-hover:-translate-y-5 transition-transform  ease-in-out duration-500">{title}</span>
                     <span className="text-sm  text-primary absolute inset-0 group-hover:translate-y-0 translate-y-5 transition-all duration-500 ease-in-out"> {title} </span>
                 </div>
             </li>
        </Link>
    )
}
