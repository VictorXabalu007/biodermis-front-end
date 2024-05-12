import { cardItems } from "../../../Home/components/CardContainer/util/cardItems"
import { StatsCard } from "../../../shared/Card/StatsCard"
import { InputRangePicker } from "../../../shared/Input/RangePicker"



export const CardContainer = () => {

    return (

        <div className="flex gap-6 flex-col">
            
            <div className="ms-auto">
                <InputRangePicker/>
            </div>

            <article className="flex gap-3 items-center flex-wrap">
                

                {cardItems.map((item,index) => {
                    return (

                    <StatsCard.Root key={index}>
                        <StatsCard.Header icon={item.icon} title={item.title}/>
                        <StatsCard.Footer>

                            <StatsCard.FooterContent
                            headingContent={item.footerHeding} 
                            textContent={`${item.footerText} ${new Date().toLocaleDateString()}`} />

                            <StatsCard.Percentual percentual={item.percentual} />

                        </StatsCard.Footer>
                    </StatsCard.Root>

                    )
                })}

            </article>

        </div>
    )
}