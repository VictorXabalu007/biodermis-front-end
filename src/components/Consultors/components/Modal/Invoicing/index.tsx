import { MoneyDataCard } from "../../../../shared/Card/MoneyDataCard"
import { buildInvoicingIcon } from "./functions/buildInvoicingIcon"
import { getCardTitleByStatus } from "./functions/getCardTitleByStatus"
import { invoicingItems } from "./util/invoicingItems"




export const InovicingModal = () => {

    return (

        <div className="flex flex-col max-h-[350px] overflow-y-scroll">

            {invoicingItems.map((item,index) => {

                return (

                <MoneyDataCard.Root
                key={index}
                >

                <MoneyDataCard.LeftWrapper>

                    {buildInvoicingIcon(item.status)}

                    <MoneyDataCard.Text
                    title={getCardTitleByStatus(item.status)}
                    subtitle={item.subtitle}
                    />

                </MoneyDataCard.LeftWrapper>

                    <MoneyDataCard.Value
                    cardType="generic"
                    value={item.value}
                    />

                </MoneyDataCard.Root>

                )


            })}



        </div>
        
    )

}