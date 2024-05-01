

import { RequestsTable } from "./components/RequestsTable";
import { TableFilters } from "./components/TableFilters"
import { TableHeader } from "./components/TableHeader"



export const TableContainer = () => {

    return (

        <div className="flex gap-3 mb-2 flex-col border rounded-md border-neutral-gray-100 p-3">

            <TableHeader />

            <TableFilters />

            <RequestsTable />

        </div>

    );

}