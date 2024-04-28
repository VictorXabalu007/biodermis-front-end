import { TableFilters } from "./components/TableFilters"
import { TableHeader } from "./components/TableHeader/TableHeader"



export const TableContainer = () => {

    return (

        <div className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3">

            <TableHeader />

            <TableFilters />

        
        </div>

    )
}