import { TableWrapper } from "../../../shared/Table/components/TableWrapper"
import { UsersTable } from "../UsersTable"
import { TableHeader } from "./components/TableHeader"



export const TableContainer = () => {

    return (

        <TableWrapper>

            <TableHeader />

            <UsersTable />

        </TableWrapper>
        
    )

}