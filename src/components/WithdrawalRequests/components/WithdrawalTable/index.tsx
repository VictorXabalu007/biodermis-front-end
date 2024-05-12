import {  TableColumnsType } from "antd"
import { Table } from "../../../shared/Table"
import { DataType, withdrawalData } from "./util/withdrawalData"
import { ArrowUpDownIcon } from "../../../shared/Icon/ArrowUpDownIcon"
import { NameItem } from "../../../shared/Image/NameItem/NameItem"
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter"
import { buildPaymentStatus } from "./functions/buildPaymentStatus"
import { PaymentStatus } from "./@types/PaymentStatus"



export const WithdrawalTable = () => {


    const columns: TableColumnsType<DataType> = [

        {
            title: <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
            dataIndex: 'name',
            key: 'name',
            render: (name)=> {

                return (

                    <NameItem name={name} />

                )

            }
        },
        {
            title: <p>Valor total em conta</p>,
            dataIndex: 'totalValueCurrent',
            key: 'totalValueCurrent',
            render: (value)=> {

                return (

                  <NumericFormatter value={value} />

                )

            }
        },
        {
            title: <p>Disponivel para saque</p>,
            dataIndex: 'avaliableWithdrawal',
            key: 'avaliableWithdrawal',
            render: (value)=> {

                return (

                  <NumericFormatter value={value} />

                )

            }
        },
        {
            title: <p>Valor solicitado</p>,
            dataIndex: 'solicitedValue',
            key: 'solicitedValue',
            render: (value)=> {

                return (

                  <NumericFormatter value={value} />

                )

            }
        },
        {
            title: <p>Status pagamento</p>,
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status:PaymentStatus)=> {

                return (

                  buildPaymentStatus(status)

                )

            }
        },


    ]


    return (

        <Table
            data={withdrawalData}
            columns={columns}
        />

    );


}