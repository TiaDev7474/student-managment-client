"use client"

import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form ,
    FormControl ,
    FormDescription ,
    FormField ,
    FormItem ,
    FormLabel ,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useUpdateStudent} from "@/app/(student)/api/student_api";


const formSchema = z.object({
    firstname: z.string( {
    }),
    lastname: z.string( {
    }),

})
export type updateStudentDto = z.infer<typeof formSchema>
export default function UpdateStudentForm({studentId, student}: {studentId: string, student: updateStudentDto}) {
    const {isLoading, isSuccess, mutate: updateStudentFn, isError} = useUpdateStudent(studentId);
    const form = useForm<updateStudentDto>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: student.firstname,
            lastname: student.lastname,
        },
    })
    async function onSubmit(values: updateStudentDto) {
        console.log('here');
        updateStudentFn(values);
        if(isSuccess){
            form.resetField("firstname");
            form.resetField("lastname");
        }
    }


    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: Rakoto" {...field}/>
                            </FormControl>
                            <FormDescription>
                                This is the student's lastname.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: Rakotozafy" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the student's lastname.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button  disabled={isLoading} type="submit"  className="">Update student</Button>
            </form>
        </Form>
    )
}
