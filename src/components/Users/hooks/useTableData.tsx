import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TableActions } from "../components/TableActions";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { UserData } from "../../Register/RegisterConsultor/components/FormContainer";
import { USERS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { getUser } from "../../../util/UserRole";


const columnsHelper = createColumnHelper<UserData>();

export const userData:UserData[] = 
JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '{}')

export const useTableData = () => {

    const [data, setData] = useState<UserData[]>(()=> {

        return Array.isArray(userData) ? userData : []

    });
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const columns = useMemo(()=>[
            columnsHelper.accessor('name', {
                header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
                cell: (name) => <NameItem name={name.getValue()} />
            }),
            columnsHelper.accessor('email', {
                header: () => <p>Email</p>,
                cell: (email) => <p>{email.getValue()}</p>
            }),
            columnsHelper.accessor('phone', {
                header: () => <p>Telefone</p> ,
                cell: (phone) => <p>{phone.getValue()}</p>
            }),
            columnsHelper.accessor('userRole', {
                header: () => <p>Tipo</p> ,
                cell: ({getValue}) => <p>{getUser(getValue())}</p>
            }),
            columnsHelper.display({
                id: 'actions',
                header: () => <p>Ações</p> ,
                cell: ({row,table}) => (

                    <TableActions 
                     data={row.original}
                     row={row}
                     table={table}

                    />
                )
            }),
        ],[]);

        return {
            data,
            columns,
            columnFilters,
            setColumnFilters,
            setData
        }



}