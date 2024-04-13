export default function TableHeader({ headers }:{ headers:string[] }) {
    return(
        <thead className="text-xs text-gray-700 uppercase   dark:text-gray-400">
            <tr>
                {
                    headers.map(title => (
                        <th key={title} scope="col" className="px-6 py-3">
                            { title }
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}
