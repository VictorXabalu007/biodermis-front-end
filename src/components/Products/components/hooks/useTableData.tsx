import { useMemo, useState } from "react";
import { Products, productsData } from "../ProductsTable/util/productsData";
import { createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter";
import { Image } from "antd/lib";
import { Button, Checkbox, Flex } from "antd";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";

const columnHelper = createColumnHelper<Products>();

export const useTableData = () => {

    const [data, setData] = useState(productsData);

    const columns = useMemo(()=> [
        columnHelper.display({
            id: 'selection',
            header: ({table}) => <Checkbox indeterminate={table.getIsSomeRowsSelected()} checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}/>,
            cell: ({row}) => <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()}/>,
            
       
        }),
        columnHelper.accessor('productImage', {
            id: 'productImage',
            header: () => <p className="px-2">#</p>,
            cell: ({getValue}) => (

                <Flex align="center" justify="center">
                   <Image width={30} style={{borderRadius: '5px'}}  src={getValue()}  />
                </Flex>

            )
        }),
        columnHelper.accessor('SKU', {
            id: 'SKU',
            header: () => <p>SKU</p>,
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('productName', {
            id: 'productName',
            header: () => <p>Nome do produto</p>,
            cell: ({getValue}) => <p>{getValue()}</p>,
            enableSorting: true
        }),
        columnHelper.accessor('price', {
            id: 'price',
            header: () => <p>Preço do produto</p>,
            cell:({getValue}) => <NumericFormatter value={getValue()} />,
            enableSorting: true
        }),
        columnHelper.accessor('stock', {
            id: 'stock',
            header: () => <p>Estoque</p>,
            cell: ({getValue}) => <p>{getValue()}</p>
        }),
        columnHelper.accessor('totalSold', {
            id: 'totalSold',
            header: () => <p>Totais vendidos</p>,
            cell: ({getValue}) => <p>{getValue()}</p>,
            enableSorting: true
        }),
        
        columnHelper.display({
            id: 'expand',
            header: () => <p>Ver mais</p>,
            cell: ({row}) => {


                const Wrapper = styled.div`
                
                    
                .expand-btn {
                    &:hover {
                        border-color: #B475A550 !important;
                    }
                }
            `

                return (

                    row.getCanExpand() ? (

                        <Flex align="center" justify="center">

                            <Wrapper>
                          
                                <Button    
                                    className="expand-btn border border-purple-solid-500"
                                    aria-label="expand row"
                                    size="small"
                                    icon={row.getIsExpanded() ? <IoIosArrowDown  className="transition-all fill-purple-solid-500" /> : <IoIosArrowUp  className="transition-all fill-purple-solid-500" />}
                                    onClick={row.getToggleExpandedHandler()}
                                />
                            </Wrapper>
                            
                        </Flex>

                        ) : null
                    )
                }
        }),
        columnHelper.display({
            id: 'delete',
            header: () => (
                <Flex align="center" justify="center">
                    <FaTrash />
                </Flex>
            ),
            cell: ({row}) => {

                const Wrapper = styled.div`
                
                    
                    .delete-btn {
                        &:hover {
                            border-color: #C882B7 !important;
                            background: #B475A5 !important;
                        }
                    }
                `

                return (

                    <Wrapper>
                        <Button
                      
                        aria-label="Delete row"
                        icon={<FaTrash />}
                        className="delete-btn bg-brand-purple"
                        size="middle"
                        onClick={() => setData(prev => prev.filter(data => data.key !== row.original.key))}
                        />
                    </Wrapper>
                )
            }
       
        }),
    ],[])

    return {data,columns};


}