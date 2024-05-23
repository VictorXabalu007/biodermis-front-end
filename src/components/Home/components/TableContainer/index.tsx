import { Button } from "../../../shared/Button";
import { Heading } from "../../../shared/Heading";
import * as C from '../../../../styles/TableStyles/styles'
import { useTableData } from "../../hooks/useTableData";
import { flexRender } from "@tanstack/react-table";
import { Pagination } from "../../../shared/Pagination";
import { useNavigate } from "react-router-dom";
import { CONSULTORS, WITHDRAWAL } from "../../../../constants/paths/paths";


export const HomeTables = () => {

    const {consultorsTable, withdrawalTable} = useTableData();

    const navigate = useNavigate();

    return (

        <div className="flex w-full lg:w-[40%] flex-col gap-5 pb-2">


             <div className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3">

                        <div className="flex justify-between">

                            <Heading.Root className="text-[16px]">
                                <Heading.Content content={'Rank de consultores'} />
                            </Heading.Root>

                            <Button.Root onClick={()=> navigate(CONSULTORS)}>
                                <Button.Content content="Gerenciar" />
                            </Button.Root>

                        </div>
                            
                        <C.Container>

                        <C.Table>
                            <C.Thead>
                                {consultorsTable.getHeaderGroups().map(headerGroup => (
                                    <C.EvenRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header)=> (
                                            <C.Th key={header.id} 
                                            onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <div className="mx-3">
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
                        
             </div>

             <div className="flex gap-3 flex-col border rounded-md border-neutral-gray-100 p-3" >
                        <div className="flex justify-between">

                            <Heading.Root className="text-[16px]">
                                <Heading.Content content={'Pedidos de saque'} />
                            </Heading.Root>

                            <Button.Root onClick={()=> navigate(WITHDRAWAL)}>
                                <Button.Content content="Gerenciar" />
                            </Button.Root>

                        </div>

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
                            
                            
             </div>
           
        </div>

    );

}