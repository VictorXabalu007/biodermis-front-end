import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { Users, usersData } from "../components/UsersTable/util/usersData";
import { useMemo, useState } from "react";
import { TableActions } from "../components/TableActions";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";


const columnsHelper = createColumnHelper<Users>();

export const useTableData = () => {

    const [data, _] = useState(usersData);
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
            columnsHelper.accessor('userType', {
                header: () => <p>Tipo</p> ,
                cell: (userType) => <p>{userType.getValue()}</p>
            }),
            columnsHelper.accessor('actions', {
                header: () => <p>Ações</p> ,
                cell: ({row}) => (

                    <TableActions 
                     data={row.original}
                    />
                )
            }),
        ],[]);

        return {
            data,
            columns,
            columnFilters,
            setColumnFilters
        }



}