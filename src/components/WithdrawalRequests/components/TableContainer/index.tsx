import { TableWrapper } from "../../../../components/shared/Table/components/TableWrapper"
import { WithdrawalTable } from "../WithdrawalTable"
import { TableHeader } from "./components/TableHeader"




export const TableContainer = () => {


    return (


        <TableWrapper>
            
            <TableHeader />
            
            <WithdrawalTable />
            
        </TableWrapper>

    )



}