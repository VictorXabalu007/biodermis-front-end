import { NumericFormatter } from "../../Formatter/NumericFormatter"
import { Text } from "../../Text"
import { MoneyCardType } from "./@types/MoneyCardType"

type MoneyDataCardValueProps = {

    value: number,
    cardType: MoneyCardType
}

const buildMoneyData = ( value:number,cardType:MoneyCardType) => {

    switch(cardType){
        case 'input':
            return (
                <Text.Root className="text-green-solid-900 font-medium font-[600]">
                        
                    <NumericFormatter value={value} />

                </Text.Root>
            )

        case 'output':
            return (
                <Text.Root className="text-red-solid-950 font-medium font-[600]">
                        
                    -<NumericFormatter value={value} />

                </Text.Root>
            )
        default:
            return (

                <Text.Root className="text-purple-solid-950 font-medium font-[600]">
                        
                    <NumericFormatter value={value} />

                </Text.Root>
                
            )
    }
}

export const MoneyDataCardValue = ({value, cardType}:MoneyDataCardValueProps) => {

    return (

        buildMoneyData(value,cardType)

    )
}