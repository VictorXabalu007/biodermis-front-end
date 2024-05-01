import { ProgressCard } from "../../../shared/Card/ProgressCard";
import { getColorStylesByKey } from "./functions/getColorStylesByKey";
import { items } from "./util/items";




export const CardContainer = () => {

    return (

        <article className="flex gap-3 items-center flex-wrap">

            {items.map((item) => {

                return (
                
                <ProgressCard.Root 
                key={item.key}
                style={getColorStylesByKey(item.key)}

                >
                    
                    <ProgressCard.Percentual
                     percent={item.percent} 
                     strokeColor={item.strokeColor}
                     
                     />
    
                    <ProgressCard.Content
                    title={item.title}
                    subText={item.subText}
                    />
                    
                </ProgressCard.Root>

                );

            })}

        </article>

    );

}