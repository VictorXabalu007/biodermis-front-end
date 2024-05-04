import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { ProductsTable } from "../ProductsTable";
import { TableHeader } from "./components/TableHeader";



export const TableContainer = () => {

    return (


        <TableWrapper>

            <TableHeader />

            <ProductsTable />

        </TableWrapper>

    );

}