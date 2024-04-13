import {httpClient} from "@/lib/axios_client";
import {createStudentDto} from "@/app/(student)/components/create_student_form";
import {useMutation , useQuery , useQueryClient} from "react-query";
import {useToast} from "@/components/ui/use-toast";

export interface ICreateAverageDto {
    average: number,
    student: string,
}
export interface IUpdateAverageDto {
    average: number
}
async function fetchAllAverage(limit: number=5,page: number = 1,) {
    return  httpClient.get(`/averages?limit=${limit}&page=${page}`);
}
function createAverage(averageDto: ICreateAverageDto) {
    console.log('ito le event')
    return httpClient.post<ICreateAverageDto>(`/averages`, averageDto);
}

function updateAverage(averageUpdateDto: IUpdateAverageDto, averageId: string) {
    return httpClient.put<IUpdateAverageDto>(`/averages/${averageId}`, averageUpdateDto);
}
function deleteAverage(averageId: string) {
    return httpClient.delete(`/averages/${averageId}`);
}
function fetchMinMax() {
    return httpClient.get('/averages/min-max')
}

export const useFetchAllAverage = (page: number=1, limit: number=5) => {
    return  useQuery(
        ['averages', page],
        () => fetchAllAverage(limit, page),
        {
            keepPreviousData: true
        }
    )
}

export const useFetchMinMax = () => {
    return  useQuery(
        ['min-max'],
        () => fetchMinMax(),
    )
}
export const useCreateAverage = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["create_average"],
        mutationFn: (averageDto: ICreateAverageDto) =>  createAverage(averageDto),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['averages'])
            await queryClient.invalidateQueries(['averages'])
            await queryClient.invalidateQueries(['min-max'])
            toast({
                title: "Successfully created ",
                description: "Average is created successfully",
            })
        }

    })
}

export const useUpdateAverage = (averageId: string) => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["update_student"],
        mutationFn: (averageUpdateDto: IUpdateAverageDto) =>  updateAverage(averageUpdateDto, averageId),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['averages'])
            await queryClient.invalidateQueries(['averages'])
            await queryClient.invalidateQueries(['min-max'])
            toast({

                title: "Successfully updated ",
                description: "Average is updated successfully",
            })
        }
    })
}


export  const  useDeleteAverage = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["delete_average"],
        mutationFn: (averageId: string) =>  deleteAverage(averageId),
        onSuccess: async ()=>{
            await queryClient.resetQueries(['averages'])
            await queryClient.invalidateQueries(['averages'])
            await queryClient.invalidateQueries(['min-max'])
            toast({

                title: "Successfully deleted ",
                description: "Average is deleted successfully",
            })
        }
    })
}
