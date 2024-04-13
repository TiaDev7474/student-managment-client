'use client'
import React from "react";
import {dehydrate, Hydrate, QueryClientProvider} from "react-query";
import {queryClient} from "@/lib/query_client";
import {ReactQueryDevtools} from "react-query/devtools";


export default  function ReactQueryClientProvider({children ,}: {
    children: React.ReactNode
}) {
    const dehydratedState = dehydrate(queryClient);
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate  state={dehydratedState}>
                {children}
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={true}/>
        </QueryClientProvider>
    )
}
