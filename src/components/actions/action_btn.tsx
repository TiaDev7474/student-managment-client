"use client";
import React from "react";



interface ActionBtnProps {
    icon: React.ReactNode,
    onClick:() => void ,
    className?: string,
    disabled: boolean
}
export default function ActionBtn(props:  ActionBtnProps) {
    const {icon, onClick, disabled, className} = props
    return(
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${className} transition-all duration-150 hover:bg-white hover:bg-opacity-5  p-2 ml-2 rounded-lg`}>
            {icon}
        </button>
    )
}
