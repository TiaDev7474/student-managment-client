import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "@radix-ui/react-icons";
interface AddBtnProps {
    onClick: () => void,
    label: string
}
export default function AddButton(props: AddBtnProps){
    const {onClick, label} = props
    return(
        <Button
            onClick={onClick}
            className="group hover:bg-accent text-[1.2rem] font-medium flex self-end gap-2 py-6  dark:bg-gradient-to-br from-primary to-accent" size={"default"}>
            {label}
            <div className="flex relative overflow-hidden ">
                 <span className="group-hover:translate-x-5 transition-transform duration-500">
                    <ArrowRightIcon  />
                </span>
                <span className="absolute inset-0 -translate-x-5 group-hover:translate-x-0 transition-all duration-500">
                   <ArrowRightIcon />
                  </span>
            </div>
        </Button>
    )
}
