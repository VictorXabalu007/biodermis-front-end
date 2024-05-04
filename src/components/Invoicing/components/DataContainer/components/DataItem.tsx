import { TfiWallet } from "react-icons/tfi";
import { Heading } from "../../../../shared/Heading";
import { Text } from "../../../../shared/Text";
import { CardDataType } from "../util/@types/CardDataType";
import { MoneyCardType } from "../../../../shared/Card/MoneyDataCard/@types/MoneyCardType";
import { MoneyDataCard } from "../../../../shared/Card/MoneyDataCard";


type DataItemProps = {

    title: string,
    subtitle:string,
    cardData: CardDataType[];
    cardType: MoneyCardType

}

export const DataItem = ({title, subtitle, cardData, cardType}:DataItemProps) => {


    return(

    <div className="border gap-3 flex flex-col rounded-md p-3 flex-1 flex border-gray-neutral-100">
            
        <div className = "mb-10 flex items-center gap-2">

            <Heading.Root className="font-semibold text-[20px] text-black">
                
                <div className="bg-brand-purple/25 rounded-md p-3">
                    <Heading.Icon className="text-brand-purple" icon={TfiWallet} />
                </div>

                <Heading.Content content={title} />

            </Heading.Root>

            <Text.Root className="font-light">
                <Text.Content content={subtitle} />
            </Text.Root>

        </div>
    
    {cardData.map(data => {

        return (

        <MoneyDataCard.Root>

            <MoneyDataCard.LeftWrapper>
                
                <MoneyDataCard.Icon cardType={cardType} />

                <MoneyDataCard.Text 
                title={data.title}
                subtitle={data.subtitle}
                />


            </MoneyDataCard.LeftWrapper>

            <MoneyDataCard.Value 
            cardType={cardType} 
            value={data.value}
             />


        </MoneyDataCard.Root>

        )


    })}

</div>


    );

}