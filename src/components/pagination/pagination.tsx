import {Button} from "@/components/ui/button";
import {ChevronLeftIcon , ChevronRightIcon} from "@radix-ui/react-icons";

interface PaginationProps {
    currentIndex: number,
    totalPage: number,
    onPrevFunc: (index: number) => void,
    onNextFunc: (index: number) => void,
    isPrevDisabled: boolean,
    isNextDisabled: boolean
}
export default function Pagination(props: PaginationProps) {
    const {currentIndex, totalPage, onNextFunc, onPrevFunc, isPrevDisabled, isNextDisabled} = props;
    const prevIndex = currentIndex > 1 ? currentIndex - 1 : 1;
    const nextIndex = currentIndex < totalPage ? currentIndex + 1 : totalPage
    return(
        <div className="flex items-center gap-3 py-4">
            <Button
                onClick={() => onPrevFunc(prevIndex)}
                disabled={isPrevDisabled}
                variant={"ghost"}
                className=""
            >
                 <ChevronLeftIcon />
                 Prev
            </Button>
            <span>
                {currentIndex + " of "+ totalPage}
            </span>
            <Button
                variant={"ghost"}
                onClick={() => onNextFunc(nextIndex)}
                disabled={isNextDisabled} className=""
            >
                Next
                <ChevronRightIcon />
            </Button>
        </div>
    )
}
