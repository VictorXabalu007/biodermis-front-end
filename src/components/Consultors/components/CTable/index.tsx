
import { TableWrapper } from "../../../shared/Table/components/TableWrapper";
import { TableHeader } from "../TableHeader";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { Pagination } from "../../../shared/Pagination";
import { useTableData } from "../../hooks/useTableData";
import { useEffect } from "react";
import { USERS_DATA } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { UserRole } from "../../../../util/UserRole";
import { TableSorters } from "../../../shared/Table/components/TableSorters";
import { Spinner } from "../../../shared/Spinner";
import { UserCredentials } from "../../../../@types/UserData/UserData";
import { Empty } from "antd";


export const ConsultorsTable = () => {

    const {
        data, 
        columns, 
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting, 
        setData,
        isLoading
    } = useTableData();

    const table = useReactTable<UserCredentials>({
        data,
        columns,
        state: {
            columnFilters,
            sorting
        },
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
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


                {isLoading ? 
                
                    <Spinner />
                
                : (
                    <>


                    {data.length === 0 ? 
                    
                        <>

                            <TableHeader 
                                columnsFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                            />    
                            <Empty 
                                description="Nenhum dado no momento"
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



                            </>

                        )
                
                    }
                        
                       
                        
                        
                        </>


                )
            
            
            
                }
                

 

                </TableWrapper>



    );
}