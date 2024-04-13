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
import {useCreateStudent} from "@/app/(student)/api/student_api";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";

const formSchema = z.object({
    firstname: z.string( {
    }),
    lastname: z.string( {
    }),

})
export type createStudentDto = z.infer<typeof formSchema>
export default function CreateStudentForm() {
    const {isLoading, isSuccess, mutate: createStudentFn, isError} = useCreateStudent();
    const form = useForm<createStudentDto>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: ""
        },
    })
    async function onSubmit(values: createStudentDto) {
         console.log('here');
         createStudentFn(values);
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
                <Button  disabled={isLoading} type="submit"  className="">Create student</Button>
            </form>
        </Form>
    )
}
