import { TableColumnsType } from "antd/lib";
import { Table } from "../../../../../shared/Table";
import { DataType, TotalValue, requestData } from "./util/requestsData";
import { TableActions } from "./components/TableActions";
import { PaymentStatus } from "./util/@types/PaymentStatus";
import { buildPaymentStatus } from "./util/functions/buildPaymentStatus";
import { buildDeliveryStatus } from "./util/functions/buildDeliveryStatus";
import { DeliveryStatys } from "./util/@types/DeliveryStatus";
import { SellOrSupply } from "./util/@types/SellOrSupply";
import { buildTotalValue } from "./util/functions/buildTotalValue";
import { FaWhatsapp } from "react-icons/fa6";
import { TableProps } from "antd";
import { useRequestFilter } from "../../../../context/FilterContext";
import { NumericFormatter } from "../../../../../shared/Formatter/NumericFormatter";
import { ArrowUpDownIcon } from "../../../../../shared/Icon/ArrowUpDownIcon";



type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

export const RequestsTable = () => {


    const {state} = useRequestFilter();

    // useEffect(()=> {

    //     console.log(state);
        
    // },[state])


    const requestColumns: TableColumnsType<DataType> = [

        {
            title: <p>Ações</p>,
            key: 'actions',
            dataIndex: 'actions',
            render: () => {
            
                return (
    
                    <TableActions />
                   
                );
            }
        },
        {
            title: <div className={'flex gap-2'}>Pedidos <ArrowUpDownIcon /></div>,
            key: 'requests',
            dataIndex: 'requests',
            render: (request) => {
            
                return (
    
                    <p>{request}</p>
    
                )
        
            },
            
        },
        {
            title: <p>Nome comprador</p>,
            key: 'buyerName',
            dataIndex: 'buyerName',
            render: (name) => {
            
                return (
    
                  <p>{name}</p>
    
                )
        
            }
        },
        {
            title: <p>Consultora</p>,
            key: 'consultor',
            dataIndex: 'consultor',
            render: (consultor) => {
            
                return (
    
                  <p>{consultor}</p>
    
                )
        
            }
        },
        {
            title: <p>Status pagamento</p>,
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            render: (status:PaymentStatus) => {
            
                return (
                    buildPaymentStatus(status)
                )
        
            }
        },
        {
            title: <p>Status de entrega</p>,
            key: 'deliveryStatus',
            dataIndex: 'deliveryStatus',
            render: (status:DeliveryStatys) => {
            
                return (
                    buildDeliveryStatus(status)
                )
        
            }
        },
        {
            title: <p >Abastecimento/Vendas</p>,
            key: 'sellOrSupply',
            dataIndex: 'sellOrSupply',
            render: (sellOrSupply:SellOrSupply) => {
            
                return (
                    <p>{sellOrSupply}</p>
                )
        
            }
        },
        {
            title: <p >Valor frete</p>,
            key: 'shippingValue',
            dataIndex: 'shippingValue',
            render: (shippingValue) => {
            
                return (
                   <NumericFormatter
                   value={shippingValue}
                   />
                )
        
            }
        },
        {
            title: <p >Valor total</p>,
            key: 'totalValue',
            dataIndex: 'totalValue',
            render: (total:TotalValue) => {
            
                return (
                    buildTotalValue(total.value, total.paymentType)
                )
        
            }
        },
        {
            title: <p>WhatsApp</p>,
            key: 'whatsaap',
            dataIndex: 'whatsaap',
            render: () => {
            
                return (
    
                   
                    <FaWhatsapp className="text-2xl mx-auto text-purple-solid-600 hover:text-purple-solid-600/50" />
              
                )
        
            }
        },
    
    
    ]


    return (

        <div className="pb-3 flex-1">
        
            <Table 
                data={requestData}
                columns={requestColumns}
                
            />
        
        </div>

    );


}