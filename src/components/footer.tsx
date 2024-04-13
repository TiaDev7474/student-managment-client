import React , {Component} from 'react';
import ScuolaLogoDark from "@/components/svgs/logo_dark";
import Link from "next/link";


function Footer() {
        return (
            <footer className="w-full h-[10rem] px-16 py-5 ">
                <div className="h-full px-4 py-5 border-t border-t-[#404040]">
                     <div>
                         <div className="flex flex-col gap-3">
                             <ScuolaLogoDark />
                             <span className="text-2xl text-[#383838] font-bold">
                                 Made by {" "}
                                 <Link href="https://github.com" target="_blank" className="text-foreground dark:hover:text-primary">
                                     @TiaDev7474
                                 </Link>
                             </span>
                         </div>
                     </div>
                </div>
            </footer>
        );
}

export default Footer;
