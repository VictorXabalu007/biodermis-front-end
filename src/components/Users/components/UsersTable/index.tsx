import { TableColumnsType } from "antd"
import { DataType, usersData } from "./util/usersData"
import { Table } from "../../../shared/Table"

import { UserType } from "./util/@types/UserType.ts"
import { TableActions } from "./components/TableActions.tsx"
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon/index.tsx"
import { NameItem } from "../../../shared/Image/NameItem/NameItem.tsx"




export const UsersTable = () => {


    const columns : TableColumnsType<DataType> = [

        {
            title: <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
            key: 'names',
            dataIndex: 'names',
            render: (name) => {

                return (
                    <NameItem name={name} />
                )
            }
        },
        {
            title: <p>Email</p>,
            key: 'email',
            dataIndex: 'email',
            render: (email) => {

                return (
                    <p>{email}</p>
                )
            }
        },
        {
            title: <p>Telefone</p>,
            key: 'phone',
            dataIndex: 'phone',
            render: (phone) => {

                return (
                    <p>{phone}</p>
                )
            }
        },
        {
            title: <p>Tipo</p>,
            key: 'userType',
            dataIndex: 'userType',
            render: (type:UserType) => {

                return (
                    <p>{type}</p>
                )
            }
        },
        {
            title: <p>Ações</p>,
            key: 'actions',
            dataIndex: 'actions',
            render: () => {

                return (
                   
                    <TableActions />

                )
            }
        },
    ]


    return (

        <Table 
            data={usersData}
            columns={columns}
        />

    )

}