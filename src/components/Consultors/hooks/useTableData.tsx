import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { Consultors, consultorsData } from "../components/CTable/util/consultorsData";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";
import { buildStatus } from "../functions/buildStatus";
import { TableActions } from "../components/TableActions";
import { IoIosArrowUp } from "react-icons/io";
import { Text } from "../../shared/Text";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { useMemo, useState } from "react";
import { USERS } from "../../../constants/paths/paths";



const columnHelper = createColumnHelper<Consultors>();

export const useTableData = () => {

    const [data, _] = useState(consultorsData);
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const columns = useMemo(() => [

        columnHelper.accessor('tops', {
            header: () => <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
            cell: (cell) => {
    
                return (
    
                        cell.getValue() === '1' || cell.getValue() === '2' || cell.getValue() === '3' ?
                        (buildPodium(cell.getValue())) : (
    
                        <div className="flex px-2 gap-2 items-center">
    
                            <Text.Root className="text-purple-solid-950">
                                <Text.Content content={cell.getValue()} />
                            </Text.Root>
    
                            <IoIosArrowUp className="text-lg text-green-flat" />
    
                        </div>
    
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
        columnHelper.accessor('totalFatured', {
            header: () => <div className="flex justify-center gap-2">Total faturado <ArrowUpDownIcon /></div>,
            cell: (total) => (
                    <NumericFormatter
                        value={total.getValue()}
                    />
                )
        }),
        columnHelper.accessor('status', {
            header: () => <p>Status</p>,
            cell: (status) => (
                buildStatus(status.getValue())
            )
        }),
        columnHelper.accessor('actions', {
            header: () => <p >Ações</p>,
            cell: ({row}) => {

                const rowData = JSON.parse(sessionStorage.getItem(USERS)?? '{}');
                console.log(rowData);
                
                
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