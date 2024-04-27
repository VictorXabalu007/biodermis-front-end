
import { StatsCard } from "../../../shared/Card/StatsCard";
import { cardItems } from "./util/cardItems";


export const CardContainer = () => {



    return (
    <article className="flex gap-3 items-center flex-wrap">

        {cardItems.map((item,index) => {
            return (

            <StatsCard.Root key={index}>
                <StatsCard.Header icon={item.icon} title={item.title}/>
                <StatsCard.Footer>

                    <StatsCard.FooterContent
                     headingContent={item.footerHeding} 
                     textContent={item.footerText} />

                    <StatsCard.Percentual percentual={item.percentual} />

                </StatsCard.Footer>
            </StatsCard.Root>

            )
        })}
    </article>

    );
}