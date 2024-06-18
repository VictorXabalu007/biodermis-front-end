import { Empty } from "antd"
import { UserCredentials } from "../../../../@types/UserData/UserData"
import { useRequestsData } from "../../../Requests/hooks/useRequestsData"
import { MoneyDataCard } from "../../Card/MoneyDataCard"
import { buildInvoicingIcon } from "./functions/buildInvoicingIcon"



export const InovicingModal = ({data}:{data:UserCredentials}) => {


    const {getRequestDataOfConsultorId} = useRequestsData();
    
    const consultorData = getRequestDataOfConsultorId(data.id);
 

    return (

        consultorData.length > 0 ? (

            <div className="flex flex-col max-h-[350px] overflow-y-scroll">

            {consultorData.map((item,index) => {

                return (

                <MoneyDataCard.Root
                key={index}
                >

                <MoneyDataCard.LeftWrapper>

                    {buildInvoicingIcon(item.statuspag)}

                    <MoneyDataCard.Text
                    title={item.statuspag}
                    subtitle={item.datapedido}
                    />

                </MoneyDataCard.LeftWrapper>

                    <MoneyDataCard.Value
                    cardType="generic"
                    value={parseFloat(item.valor)}
                    />

                </MoneyDataCard.Root>

                )


            })}



        </div>


        ) : (

            <Empty
                description="Nenhum dado para esse consultor no momento"
            />

        )


        
    )

}