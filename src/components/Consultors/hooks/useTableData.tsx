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
import { UserRole } from "../../../util/UserRole";
import { UserData } from "../../Register/RegisterConsultor/components/FormContainer";
import { Flex } from "antd";


const columnHelper = createColumnHelper<UserData>();

export const consultorsData:UserData[] = 
JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '{}')

export const useTableData = () => {

    
    const [data, _] = useState<UserData[]>(() => {
        if (consultorsData && consultorsData.length > 0) {
            return consultorsData.filter((d: UserData) => d.userRole === UserRole.CONSULTOR);
        } else {
            return [];
        }
    });
    
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    

    const columns = useMemo(() => [

        columnHelper.accessor('id', {
            header: () => <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
            cell: (cell) => {
    
                return (
    
                        cell.getValue() === '1' || cell.getValue() === '2' || cell.getValue() === '3' ?
                        (buildPodium(cell.getValue())) : (
    
                        <Flex gap={2} align="center" className="px-2">
    
                            <Text.Root className="text-purple-solid-950">
                                <Text.Content content={cell.getValue()} />
                            </Text.Root>
    
                            <IoIosArrowUp className="text-lg text-green-flat" />
    
                        </Flex>
    
                        )
    
                );
            }
        }),
        columnHelper.accessor('name', {
            header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /> </div>,
            cell: (name) => <NameItem name={name.getValue()} />
        }),
        columnHelper.accessor('email', {
            header: () => <p>Email</p>,
            cell: (email) => <p> {email.getValue()} </p>
        }),
        columnHelper.accessor('phone', {
            header: () => <p>Telefone</p>,
            cell: (phone) => <p> {phone.getValue()} </p>
        }),
        columnHelper.display({
            id: 'totalFatured',
            header: () => <Flex gap={2} justify="center">Total faturado <ArrowUpDownIcon /></Flex>,
            cell: () => (
                    <NumericFormatter
                        value={1500}
                    />
                )
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
            cell: ({row}) => {
                
                return (

                    <TableActions
                        data={row.original}
                        
                    />

                )
        
        }
        }),
    ],[]);
    

    return {
        data,
        columns,
        columnFilters,
        setColumnFilters
    }
}