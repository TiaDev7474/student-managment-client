import {httpClient} from "@/lib/axios_client";
import {createStudentDto} from "@/app/(student)/components/create_student_form";
import {useMutation , useQuery , useQueryClient} from "react-query";
import {useToast} from "@/components/ui/use-toast";


async function fetchAllStudent( page: number = 1, limit: number,) {
    return  httpClient.get(`/students?$limit=${limit}&page=${page}`);
}

function createStudent(studentDto: createStudentDto) {
    return httpClient.post<createStudentDto>(`/students`, studentDto);
}
function updateStudent(studentDto: createStudentDto, id: string) {
    return httpClient.put<createStudentDto>(`/students/${id}`, studentDto);
}

function deleteStudent(studentId: string) {
    return httpClient.delete(`/students/${studentId}`,);
}



export const useFetchAllStudent = (page: number, limit: number=5) => {
     return  useQuery(
         ['students', page],
          () => fetchAllStudent(page, limit),
         {
             keepPreviousData: true
         }
     )
}

export const useCreateStudent = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["create_student"],
        mutationFn: (studentDto: createStudentDto) =>  createStudent(studentDto),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['students'])
            await queryClient.invalidateQueries(['students'])
            toast({
                title: "Successfully created ",
                description: "Student is created successfully",
            })
        }
    })
}
export const useUpdateStudent = (id: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["create_student"],
        mutationFn: (studentDto: createStudentDto) =>  updateStudent(studentDto, id),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['students'])
            await queryClient.invalidateQueries(['students'])
            toast({
                title: "Successfully updated ",
                description: "Student is updated successfully",
            })
        }
    })
}
export  const  useDeleteStudent = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["delete_student"],
        mutationFn: (studentId: string) =>  deleteStudent(studentId),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['students'])
            await queryClient.invalidateQueries(['students'])
            toast({
                title: "Successfully deleted ",
                description: "Student is deleted successfully",
            })
        }

    })
}
