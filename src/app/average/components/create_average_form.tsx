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
import { useCreateAverage} from "@/app/average/api/average_api";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    average: z.coerce
        .number({
            required_error: "Average is required",
            invalid_type_error: "Average must be a number",
        })
        .int()
        .positive()
    ,
    student: z.string( {
    }),

})
type createAverageDto = z.infer<typeof formSchema>

type FormProps = {
    studentId: string,
    label: string
}
export default function CreateAverageForm({studentId, label }: FormProps) {
    const {isLoading, isSuccess, mutate: createAverageFn, isError} = useCreateAverage();
    const form = useForm<createAverageDto>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            average: Infinity,
            student: studentId
        },
    })
    async function onSubmit(values: createAverageDto) {
        createAverageFn(values)
        form.resetField("average");

    }
    return(
        <Form {...form}>
            <form  className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="average"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Average</FormLabel>
                            <FormControl>
                                <Input  type="number" pattern="[0-9]*" placeholder="Average out of 20"  {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the student's average.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button  disabled={isLoading} type="submit"  className="">
                    {label}
                </Button>
            </form>
        </Form>
    )
}
