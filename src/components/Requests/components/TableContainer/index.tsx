

import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { RequestsTable } from "./components/RequestsTable";
import { TableFilters } from "./components/TableFilters"
import { TableHeader } from "./components/TableHeader"



export const TableContainer = () => {

    return (

        <TableWrapper>
            
            <TableHeader />

            <TableFilters />

            <RequestsTable />

        </TableWrapper>

    );

}