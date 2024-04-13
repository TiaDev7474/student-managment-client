import Table from "@/components/table/table";
import {headers , rows} from "@/lib/data";
import TableCell from "@/components/table/cell";
import TableRow from "@/components/table/row";
import ActionBtn from "@/components/actions/action_btn";
import {BiEdit , BiTrash} from "react-icons/bi";
import Pagination from "@/components/pagination/pagination";
import {useDeleteStudent , useFetchAllStudent} from "@/app/(student)/api/student_api";
import {Fragment , useState} from "react";
import {dateFormatter} from "@/lib/utils";
import {updateStudentDto} from "@/app/(student)/components/update_student_form";
import Loader from "@/components/loader";

export interface IStudent {
    id: string,
    firstname: string,
    lastname: string,
    createdAt: Date,
    updatedAt: Date
}
export default function StudentTable({onOpenEditModal}: {onOpenEditModal:(studentId: string, student: updateStudentDto) => void}) {
     const [page , setPage] = useState(1);
     const {isLoading, isSuccess, data} = useFetchAllStudent(page);
     const {isLoading: deleteLoading, mutate:deleteFn} = useDeleteStudent();
     const handlePageChange = (page: number) => {
         setPage(page)
     }
     const handleDeleteFn = (studentId: string) => {
         console.log(studentId)
         deleteFn(studentId);
     }
     if(isLoading){
         return (
             <div className="w-full h-full flex justify-center items-center">
                 <Loader />
             </div>
         )
     }
    return(
        <div className="w-full text-center">
            {
                data?.data.data.length > 0 ? (
                    <Fragment>
                        <Table headers={headers} >
                            {
                                data?.data.data.map((student: IStudent) => (
                                    <TableCell key={student.id}>
                                        <TableRow data={student.firstname} />
                                        <TableRow data={student.lastname} />
                                        <TableRow data={dateFormatter(student.createdAt)} />
                                        <TableRow data={dateFormatter(student.updatedAt)} />
                                        <TableRow className="">
                                            <ActionBtn
                                                disabled={false}
                                                onClick={() => onOpenEditModal(student.id,{firstname: student.firstname, lastname: student.lastname})}
                                                className="hover:text-secondary " icon={ <BiEdit size={22} />}
                                            />
                                            <ActionBtn
                                                disabled={deleteLoading}
                                                onClick={() => handleDeleteFn(student.id)}
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
