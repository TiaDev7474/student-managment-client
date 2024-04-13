import {Fragment , useState} from "react";
import Table from "@/components/table/table";
import {averageHeaders , headers} from "@/lib/data";
import TableCell from "@/components/table/cell";
import TableRow from "@/components/table/row";
import ActionBtn from "@/components/actions/action_btn";
import {BiEdit , BiTrash} from "react-icons/bi";
import Pagination from "@/components/pagination/pagination";
import {IStudent} from "@/app/(student)/components/student_table";
import {useDeleteAverage , useFetchAllAverage} from "@/app/average/api/average_api";
import {Button} from "@/components/ui/button";
import {FaPlusSquare} from "react-icons/fa";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {clsx} from "clsx";
import {dateFormatter} from "@/lib/utils";
import Loader from "@/components/loader";


interface IAverage {
    id: string,
    average: number,
    createdAt: Date,
    updatedAt: Date
}
interface IStudentWithAverage extends IStudent{
    average : IAverage[]
}
export default function AverageTable({
                                         onAddAverageRequest, onUpdateAverageRequest}: {onAddAverageRequest: (id: string) => void, onUpdateAverageRequest: (id: string, weight: number) => void  }) {
    const [page , setPage] = useState(1);
    const {isLoading, isSuccess, data} = useFetchAllAverage(page);
    const {isLoading: deleteLoading, mutate:deleteFn} = useDeleteAverage();
    const handlePageChange = (page: number) => {
        setPage(page)
    }
    const handleDeleteFn = (averageId: string) => {
        console.log(averageId)
        deleteFn(averageId);
    }
    const makeDecision = (average: number) => {
        if(average < 5){
            return "Expelled"
        }else if(average <10 ){
            return "Repeater"
        }
        return "Admitted"
    }
    if(isLoading){
        return (
            <div className="w-full h-full mt-48 flex justify-center items-center">
                <Loader />
            </div>
        )
    }
    return(
        <div className="w-full text-center">
            {
                data?.data.data.length > 0 ? (
                    <Fragment>
                        <Table headers={averageHeaders} >
                            {
                                data?.data.data.map((average: IStudentWithAverage) => (
                                    <TableCell key={average.id}>
                                        <TableRow className="" data={`${average.firstname} ${average.lastname}`} />
                                        {
                                            average.average.length > 0 ? (
                                                <TableRow className="w-[10rem]  group cursor-pointer relative flex justify-center items-center" data={average.average[0].average}>
                                                    <Button
                                                        onClick={() => onUpdateAverageRequest(average.average[0].id, average.average[0].average)}
                                                        variant={"ghost"}
                                                        className="hidden group-hover:block absolute  right-1">
                                                        <Pencil1Icon />
                                                    </Button>
                                                </TableRow>
                                            ): (
                                                <TableRow>
                                                    <Button
                                                        onClick={(event) => {
                                                            console.log("click")
                                                            onAddAverageRequest(average.id)
                                                        }

                                                        }
                                                        variant={"ghost"} className="text-accent flex gap-2 z-50"
                                                    >
                                                        <FaPlusSquare />
                                                        Add average
                                                    </Button>
                                                </TableRow>
                                            )
                                        }
                                        <TableRow>
                                            {
                                                average.average.length > 0 ? (
                                                    <div className={clsx('px-6 py-3 rounded-sm',{
                                                         "bg-primary": makeDecision(average.average[0].average) == "Admitted",
                                                        "bg-accent": makeDecision(average.average[0].average) == "Repeater",
                                                        "bg-red-400": makeDecision(average.average[0].average) == "Expelled"
                                                    })}>
                                                        {makeDecision(average.average[0].average)}
                                                    </div>
                                                ): (
                                                    <span className="text-border">waiting evaluation</span>
                                                )
                                            }

                                        </TableRow >
                                        <TableRow data={dateFormatter(average.createdAt)} />
                                        <TableRow data={dateFormatter(average.updatedAt)} />
                                        <TableRow className="">
                                            <ActionBtn
                                                disabled={deleteLoading || average.average.length == 0}
                                                onClick={() => handleDeleteFn(average.average[0].id)}
                                                className="hover:text-destructive "
                                                icon={ <BiTrash size={22}/>}
                                            />
                                        </TableRow>
                                    </TableCell>
                                ))
                            }
                        </Table>
                        {
                            data?.data.meta &&
                            <Pagination
                                currentIndex={page}
                                totalPage={data.data.meta.totalPages}
                                onPrevFunc={handlePageChange}
                                onNextFunc={handlePageChange}
                                isPrevDisabled={page == 1}
                                isNextDisabled={page == data?.data.meta.totalPages}
                            />
                        }

                    </Fragment>

                ): (
                    <span>No record yet</span>
                )
            }

        </div>
    )
}
