import React , {Component} from 'react';
import ScuolaLogoDark from "@/components/svgs/logo_dark";
import Link from "next/link";
import CustomLink from "@/components/link";
import {PersonIcon} from "@radix-ui/react-icons";
import {BiNote} from "react-icons/bi";

function NavBar() {
    return (
        <nav className="w-full h-[5rem] px-20  ">
             <div className="w-full flex justify-between py-2 items-center border-b-[#404040] border-b ">
                  <span>
                      <ScuolaLogoDark />
                   </span>
                 <div className="flex gap-5 flex-1 justify-center">
                     <CustomLink href="/" title="Students" icon={<PersonIcon />}/>
                     <CustomLink href="/average" title="Average" icon={<BiNote />} />
                 </div>
             </div>
        </nav>
    )
}

export default NavBar;
