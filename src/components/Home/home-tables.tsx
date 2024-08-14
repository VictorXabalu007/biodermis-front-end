

import { Flex } from "antd";
import HomeConsultorsTable from "./homeTables/consultors-table";
import HomeWithdrawTable from "./homeTables/withdraw-table";


const HomeTables = () => {



    return (

        <Flex 
            gap={15}
            vertical
        >

            <HomeConsultorsTable

            />

            <HomeWithdrawTable />

             {/* <div style={{background:colorBgContainer}} className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3">

                        <div className="flex justify-between">

                            <Heading.Root className="text-[16px]">
                                <Heading.Content content={'Rank de consultores'} />
                            </Heading.Root>

                            <Button.Root onClick={handleConsultorsNavigate}>
                                <Button.Content content="Gerenciar" />
                            </Button.Root>

                        </div>

                        <TableWrapper style={{minHeight: '52vh'}}>

                            {isLoadingConsultores ?
                            
                                <Spinner />


                                : (

                                    <>

                                    {isConsultorsEmpty() ? (

                                        <>
                                            <Empty 
                                                description="Sem dados no momento"
                                            
                                            />
                                        </>
                                    ) : 
                                    (
                                    
                                        <>


                                    <C.Container>

                                                                    
                                    <C.Table>
                                        <C.Thead>
                                            {consultorsTable.getHeaderGroups().map(headerGroup => (
                                                <C.EvenRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header)=> (
                                                        <C.Th key={header.id} 
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            <div className="mx-3 flex justify-center">
                                                                {flexRender(header.column.columnDef.header,
                                                                    header.getContext())}
                                                                
                                                            </div>
                                                        </C.Th>
                                                        
                                                    
                                                    ))}
                                                </C.EvenRow>
                                            ))}
                                        </C.Thead>

                                        <tbody>
                                            {consultorsTable.getRowModel().rows.map((row)=> (
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

                                    <Pagination table={consultorsTable} />
                                        </>



                                    )
                                
                                }
                                    
                                
                                    
                                    </>


                                )}



                        </TableWrapper>
                              
             </div> */}

             {/* <div style={{background:colorBgContainer}} className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3" >
                        <div className="flex justify-between">

                            <Heading.Root className="text-[16px]">
                                <Heading.Content content={'Pedidos de saque'} />
                            </Heading.Root>

                            <Button.Root onClick={handleWithdrawNavigate}>
                                <Button.Content content="Gerenciar" />
                            </Button.Root>

                        </div>
                        

                        <TableWrapper style={{minHeight: '50vh'}}>

                            {isLoadingWithdrawal ? 
                            
                                <Spinner />

                                :(
                                    <>

                                    {isWithdrawEmpty() ? 
                                    <>
                                    
                                        <Empty
                                            description="Sem dados no momento"
                                        />
                                    
                                    </> : (


                                        <>

                                            <C.Container>

                                            <C.Table>
                                                <C.Thead 
                                                className="bg-gray-neutral-200" >
                                                    {withdrawalTable.getHeaderGroups().map(headerGroup => (
                                                        <C.EvenRow key={headerGroup.id}>
                                                            {headerGroup.headers.map((header)=> (
                                                                <C.Th key={header.id} 
                                                                onClick={header.column.getToggleSortingHandler()}
                                                                >
                                                                    <div className="mx-3 flex">
                                                                        {flexRender(header.column.columnDef.header,
                                                                            header.getContext())}
                                                                                                            
                                                                            {
                                                                            header.column.getIsSorted() === 'asc' ? '⬆️' :
                                                                            header.column.getIsSorted() === 'desc' ? '⬇️' :
                                                                            null
                                                                            }
                                                                        
                                                                    </div>
                                                                </C.Th>
                                                                
                                                            
                                                            ))}
                                                        </C.EvenRow>
                                                    ))}
                                                </C.Thead >

                                                <tbody>
                                                    {withdrawalTable.getRowModel().rows.map((row)=> (
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

                                            <Pagination table={withdrawalTable} />


                                        </>




                                    )}

                        
                                    
                                    </>
                                )
                        
                            }



                        </TableWrapper> */}

                            
             {/* </div> */}
        </Flex>


           
    

    );

}

export default HomeTables