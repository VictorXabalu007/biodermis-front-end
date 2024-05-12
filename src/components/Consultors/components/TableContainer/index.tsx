import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { ConsultorsTable } from "./components/ConsultorsTable";
import { TableHeader } from "./components/TableHeader";





export const TableContainer = () => {

    return (


            <TableWrapper>

                <TableHeader />

                <ConsultorsTable />

            </TableWrapper>

    );

}