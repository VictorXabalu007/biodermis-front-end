import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildStatus } from "../functions/buildStatus";
import { TableActions } from "../components/TableActions";
import { IoIosArrowUp } from "react-icons/io";
import { Text } from "../../shared/Text";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { useMemo, useState } from "react";
import { USERS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { UserData } from "../../Register/RegisterConsultor/components/FormContainer";
import { Flex } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getConsultors } from "../service/getConsultors";


export interface ConsultorsData extends UserData {
    totalFatured: number
    rank: string
    bankData: UserData['bankData'];
}

const columnHelper = createColumnHelper<ConsultorsData>();

export const consultorsData:ConsultorsData[] = 
JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '{}')

export const useTableData = () => {

    const {data:consultors, isLoading} = useQuery({
        queryKey: ['consultors'],
        queryFn: getConsultors

    });


    const [data, setData] = useState<ConsultorsData[]>(() => {
        if (consultors && consultorsData.length > 0) {
            const sortedData = consultorsData
                .sort((a, b) => b.totalFatured - a.totalFatured);
    
            return sortedData.map((d, index) => ({
                ...d,
                rank: String(index + 1),
            }));
        } else {
            return [];
        }
    });

    console.log(data);
    
    const [sorting, setSorting] = useState<any[]>([]);
    
    
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    

    const columns = useMemo(() => [

        columnHelper.accessor('rank', {
            header: () => <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
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
        columnHelper.accessor('name', {
            header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /> </div>,
            cell: (name) => <NameItem name={name.getValue()} />,
            enableSorting: true,
        }),
        columnHelper.accessor('email', {
            header: () => <p>Email</p>,
            cell: (email) => <p> {email.getValue()} </p>
        }),
        columnHelper.accessor('phone', {
            header: () => <p>Telefone</p>,
            cell: (phone) => <p> {phone.getValue()} </p>
        }),
        columnHelper.accessor('totalFatured',{
            id: 'totalFatured',
            header: () => <Flex gap={2} justify="center">Total faturado <ArrowUpDownIcon /></Flex>,
            cell: ({getValue}) => (
                    <NumericFormatter
                        value={getValue()}
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
        data,
        columns,
        columnFilters,
        sorting,
        setSorting,
        setData,
        setColumnFilters,
        isLoading
    }
}