
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData";
import { Pagination } from "../../../shared/Pagination";
import { Consultors } from "./util/consultorsData";



export const ConsultorsTable = () => {

    const {data, columns, columnFilters, setColumnFilters} = useTableData();

    const table = useReactTable<Consultors>({
        data,
        columns,
        debugTable: true,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });


    return (


                <TableWrapper>

                    <TableHeader 
                     columnsFilters={columnFilters}
                     setColumnFilters={setColumnFilters}
                    />
                        
                    <C.Container>

                    <C.Table>
                        <thead 
                        className="bg-gray-neutral-200" 
                        style={{width: table.getTotalSize()}}
                        >
                            {table.getHeaderGroups().map(headerGroup => (
                                <C.EvenRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header)=> (
                                        <C.Th key={header.id}>
                                            <div className="mx-3">
                                                {flexRender(header.column.columnDef.header,
                                                    header.getContext())}
                                            </div>
      
                                        </C.Th>
                                    
                                    ))}
                                </C.EvenRow>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.map((row)=> (
                                <C.HoverRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <C.Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell,
                                                cell.getContext())}
                                        </C.Td>
                                    ))}
                                </C.HoverRow>
                            ))}
                        </tbody>
                    </C.Table>

                </C.Container>

                <Pagination table={table}/>

                </TableWrapper>



    );
}