
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { Pagination } from "../../../shared/Pagination";
import { ConsultorsData, useTableData } from "../../hooks/useTableData";
import { useEffect } from "react";
import { USERS_DATA } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { UserRole } from "../../../../util/UserRole";



export const ConsultorsTable = () => {

    const {data, columns, columnFilters, setColumnFilters, setData} = useTableData();

    const table = useReactTable<ConsultorsData>({
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
        meta: {
            updateData: (rowIndex:number, data:any) => setData(
                prev => prev.map((row,index) => 
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        ...data
                    } : row
                )
            )
        }

    });

    useEffect(() => {

        const usersData = JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '[]');

        if (Array.isArray(usersData) && usersData.length > 0) {

            const updatedUsersData = usersData.map(user => {
                if (user.userRole === UserRole.CONSULTOR) {
                    const updatedConsultor = data.find(d => d.id === user.id);
                    return updatedConsultor ? { ...user, ...updatedConsultor } : user;
                }
                return user;
            });

            sessionStorage.setItem(USERS_DATA, JSON.stringify(updatedUsersData));
        }

    }, [data]);


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