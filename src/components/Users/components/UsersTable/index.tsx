
import { TableWrapper } from "../../../shared/Table/components/TableWrapper.tsx"
import { TableHeader } from "../TableHeader/index.tsx"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData.tsx"
import { Pagination } from "../../../shared/Pagination/index.tsx"
import { USERS_DATA } from "../../../../constants/SessionStorageKeys/sessionStorageKeys.ts"
import { useEffect } from "react"
import { TableSorters } from "../../../shared/Table/components/TableSorters.tsx"
import { Empty, Spin } from "antd"
import { Spinner } from "../../../shared/Spinner/index.tsx"
import { UserCredentials } from "../../../../@types/UserData/UserData.ts"


export const UsersTable = () => {


    const {
         columnFilters,
         columns, 
         users,
         setUsers, 
         setColumnFilters,
         sorting,
         setSorting,
         isLoading
    } = useTableData();
    
    const table = useReactTable<UserCredentials>({

        data:users,
        columns,
        state:{
            columnFilters,
            sorting,
        },
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        meta: {
            updateData: (rowIndex:number, data:any) => setUsers(
                prev => prev.map((row,index) => 
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        ...data
                    } : row
                )
            )
        }

    })

    useEffect(() => {

        const usersData = JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '[]');

        if (Array.isArray(usersData) && usersData.length > 0) {

            const updatedUsersData = usersData.map(user => {
                
                const updateUser = users.find(d => d.id === user.id);
                return updateUser ? { ...user, ...updateUser } : user;

            });

            sessionStorage.setItem(USERS_DATA, JSON.stringify(updatedUsersData));
        }

    }, [users]);

    return (

        <TableWrapper>


            {isLoading ?
            
                <Spinner />

            : (


                <>


                {users.length === 0 ?

                <>

                <TableHeader
                    columnsFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                />
                <Empty 

                    description={"Sem dados no momento"}
                
                />


                </>

                : (

                <>

                <TableHeader
                    columnsFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    />


                <C.Container>

                    <C.Table>
                        <C.Thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <C.EvenRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header)=> (
                                        
                                        <TableSorters header={header} />   
                                    
                                    ))}
                                </C.EvenRow>
                            ))}
                        </C.Thead >

                        <tbody>

                            {isLoading && 

                                <Spin />
                            
                            }
                            
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

                <Pagination table={table} />
                

                    </>

                )}
                
           
                </>
            )}

     


        </TableWrapper>

    )

}