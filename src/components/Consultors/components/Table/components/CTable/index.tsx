import { TableColumnsType } from "antd";
import { Table } from "../../../../../shared/Table";
import { DataType, consultorsData } from "./util/consultorsData";
import { buildPodium } from "../../../../../shared/Table/functions/buildPodium";
import { Text } from "../../../../../shared/Text";
import { IoIosArrowUp } from "react-icons/io";
import { buildStatus } from "./util/functions/buildStatus.tsx";
import { TableActions } from "./util/components/TableActions.tsx";
import { NumericFormatter } from "../../../../../shared/Formatter/NumericFormatter.tsx";
import { ArrowUpDownIcon } from "../../../../../shared/Icon/ArrowUpDownIcon/index.tsx";
import { NameItem } from "../../../../../shared/Image/NameItem/NameItem.tsx";




export const ConsultorsTable = () => {


    const columns: TableColumnsType<DataType> = [

        {
            title: <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
            key: 'tops',
            dataIndex: 'tops',
            render: (top) => {

                return (

                    top === '1' || top === '2' || top === '3' ?
                    (buildPodium(top)) : (

                    <div className="flex gap-2 items-center">

                        <Text.Root className="text-purple-solid-950">
                            <Text.Content content={top} />
                        </Text.Root>

                        <IoIosArrowUp className="text-lg text-green-flat" />

                    </div>

                    )

                );

            }
        },
        {
            title: <div className="flex gap-2">Nomes <ArrowUpDownIcon /> </div>,
            key: 'name',
            dataIndex: 'name',
            render: (name) => {

                return (

                    <NameItem name={name} />

                );

            }
        },
        {
            title: <p>Email</p>,
            key: 'email',
            dataIndex: 'email',
            render: (email) => {

                return (

                    <p>{email}</p>

                );

            }
        },
        {
            title: <p>Telefone</p>,
            key: 'phone',
            dataIndex: 'phone',
            render: (phone) => {

                return (

                    <p>{phone}</p>

                );

            }
        },
        {
            title:  <div className="flex gap-2">Total faturado <ArrowUpDownIcon /></div>,
            key: 'totalFatured',
            dataIndex: 'totalFatured',
            render: (total) => {

                return (

                    <NumericFormatter
                    value={total}
                    />

                );

            }
        },
        {
            title:  <p>Status</p>,
            key: 'status',
            dataIndex: 'status',
            render: (status) => {

                return (

                    buildStatus(status)

                );

            }
        },
        {
            title:  <p>Ações</p>,
            key: 'actions',
            dataIndex: 'actions',
            render: () => {

                return (

                    <TableActions
                    
                    />

                );

            }
        },
        

    ]


    return (



                <Table 
                
                    data={consultorsData}
                    columns={columns}
                
                />




    );
}