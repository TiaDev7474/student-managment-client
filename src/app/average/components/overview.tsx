import {SquareIcon} from "@radix-ui/react-icons";
import {useFetchMinMax} from "@/app/average/api/average_api";
import {Fragment} from "react";
import { BarChart } from '@tremor/react';
export default function Overview() {
    const {isLoading, isError, isSuccess, data} = useFetchMinMax();
    return(
        <div className="w-full flex-col h-full gap-2">
            {
                data?.data.data &&
                <div className="w-full flex-col h-full gap-5">
                    <div className="min-h-[10rem] py-2 px-5 bg-[#282828] rounded-lg border-accent border-b">
                        <h3 className="py-2 text-xl">Overview</h3>
                        <div className="flex w-full justify-between items-center p-2">
                            <div className="text-primary">
                                <SquareIcon />
                                <span className="text-sm dark:text-foreground font-light">Highest</span>
                            </div>
                            <h2 className="text-primary text-2xl">{data.data.data._max.average}</h2>
                        </div>
                        <div className="flex w-full justify-between items-center p-2">
                            <div className="text-red-400">
                                <SquareIcon />
                                <span className="text-sm dark:text-foreground font-light">Lowest</span>
                            </div>
                            <h2 className="text-red-400 text-2xl">{data.data.data._min.average}</h2>
                        </div>
                    </div>
                    <div className="text-foreground min-h-[10rem] py-2 px-5 bg-[#282828] rounded-lg border-accent border-b mt-4">
                        <BarChart
                            data={[{'average':data.data.data._max.average,name:'Highest'},{'average': data.data.data._min.average, name:'Lowest'}]}
                            index="name"
                            categories={['average']}
                            colors={['green-400']}
                            yAxisWidth={50}
                            onValueChange={(v) => console.log(v)}
                        />
                    </div>

                </div>

            }
        </div>
    )
}
