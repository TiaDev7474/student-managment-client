import React from "react";
import {Button} from "@/components/ui/button";
import {CgClose} from "react-icons/cg";



interface ModalProps {
  children: React.ReactNode,
  shouldShowModal?: boolean,
  handleOnCLoseModal?: () => void  ,
}
export default function Modal(props: ModalProps){
    const {children, shouldShowModal, handleOnCLoseModal} = props;
    return(
        <React.Fragment>
            {
                shouldShowModal &&
                <div className=" w-full h-full  bg-black bg-opacity-50 inset-0 absolute transition-all ">
                    <div

                        className="flex justify-center items-center z-50 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 p-6  min-h-40 rounded-lg min-w-40 dark:bg-background"
                    >
                        <Button onClick={handleOnCLoseModal} size={"icon"} variant={"ghost"} className="absolute top-1 left-1 hover:bg-opacity-5 ">
                            <CgClose  />
                        </Button>
                        { children }
                    </div>
                 </div>
            }
        </React.Fragment>

    )
}
