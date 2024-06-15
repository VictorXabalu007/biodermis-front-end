
import { useRangeDate } from "../../../../context/RangeDate/RangeDateContext"
import { useInvoicingCardItem } from "../../hooks/useInvoicingCardItem";
import { StatsCard } from "../../../shared/Card/StatsCard"
import { InputRangePicker } from "../../../shared/Input/RangePicker"



export const CardContainer = () => {

    const {state,getDates} = useRangeDate();
    const {items} = useInvoicingCardItem();


    return (

        <div className="flex gap-6 flex-col">
            
            <div className="ms-auto">
                <InputRangePicker/>
            </div>

            <article className="flex gap-3 items-center flex-wrap">
                

                {items.map((item,index) => {
                    return (

                    <StatsCard.Root key={index}>
                        <StatsCard.Header icon={item.icon} title={item.title}/>
                        <StatsCard.Footer>

                            <StatsCard.FooterContent
                            headingContent={item.footerHeding} 
                            textContent={item.footerText}
                            dates={
                                state.rangeDate[0].length > 0 ?
                                `${getDates(state).startDate} 
                                - ${getDates(state).endDate}`
                                : new Date().toLocaleDateString()
                             }
                            />
        
                            <StatsCard.Percentual percentual={item.percentual} />

                        </StatsCard.Footer>
                    </StatsCard.Root>

                    )
                })}

            </article>

        </div>
    )
}