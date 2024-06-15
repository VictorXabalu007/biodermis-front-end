import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildStatus } from "../functions/buildStatus";
import { TableActions } from "../components/TableActions";
import { IoIosArrowUp } from "react-icons/io";
import { Text } from "../../shared/Text";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { useMemo, useState } from "react";
import { Flex } from "antd";
import { CONSULTORS } from "../../../constants/paths/paths";
import { UserCredentials } from "../../../@types/UserData/UserData";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { useConsultorData } from "./useConsultorData";


const columnHelper = createColumnHelper<UserCredentials>();

export const consultorsData:UserCredentials[] = 
JSON.parse(sessionStorage.getItem(CONSULTORS) ?? '{}')

export const useTableData = () => {

    const {consultor,setConsultor, isLoading} = useConsultorData();
      
    const [sorting, setSorting] = useState<any[]>([]);
    
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    

    const columns = useMemo(() => [

        columnHelper.accessor('rank', {
            header: ({header}) => <TableSorterTitle header={header} title="Tops" />,
            cell: ({getValue}) => {
    
                return (
    
                        getValue() === '1' || getValue() === '2' || getValue() === '3' ?
                        (buildPodium(getValue())) : (
    
                        <Flex gap={2} justify="center" align="center" className="px-2">
    
                            <Text.Root className="text-purple-solid-950">
                                <Text.Content content={getValue()} />
                            </Text.Root>
    
                            <IoIosArrowUp className="text-lg text-green-flat" />
    
                        </Flex>
    
                        )
    
                );
            },
            enableSorting: true,
        }),
        columnHelper.display({
            id: 'userImage',
            header: ()=> <div>#</div>
        }),
        columnHelper.accessor('nome', {
            header: ({header}) => <TableSorterTitle header={header} title="Nomes" />,
            cell: ({getValue}) => <p>{getValue()}</p>,
            enableSorting: true,
        }),
        columnHelper.accessor('email', {
            header: () => <p>Email</p>,
            cell: (email) => <p> {email.getValue()} </p>
        }),
        columnHelper.accessor('telefone', {
            header: () => <p>Telefone</p>,
            cell: (phone) => <p> {phone.getValue()} </p>
        }),
        columnHelper.accessor('totalfat',{
            id: 'totalFatured',
            header: ({header}) => <TableSorterTitle header={header} title="Total faturado" />,
            cell: ({getValue}) => (
                    <NumericFormatter
                        value={parseFloat(getValue())}
                    />
                ),
            enableSorting: true
        }),
        columnHelper.accessor('status',{
            id: 'status',
            header: () => <p>Status</p>,
            cell: ({getValue}) => (
                buildStatus(getValue())
            )
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <p >Ações</p>,
            cell: ({row, table}) => {
                
                return (

                    <TableActions

                        data={row.original}
                        table={table}
                        row={row}
                        
                    />

                )
        
        }
        }),
    ],[]);
    

    return {
        data:consultor,
        columns,
        columnFilters,
        sorting,
        setSorting,
        setData:setConsultor,
        setColumnFilters,
        isLoading
    }
}