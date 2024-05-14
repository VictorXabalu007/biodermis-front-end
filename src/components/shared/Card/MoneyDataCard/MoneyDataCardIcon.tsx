import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io"
import { MoneyCardType } from "./@types/MoneyCardType"
import { ElementType } from "react"


const buildCardIcon = (cardType:MoneyCardType) => {
    
    switch(cardType) {

        case 'input':
            return (


                <div className="bg-green-solid-300/50 rounded-md px-2 flex items-center py-2">
        
                    <IoIosArrowRoundForward className="text-green-solid-900 text-3xl" />
        
                </div>
        
            )

        case 'output': 

            return (


                <div className="bg-red-solid-400 rounded-md px-2 flex items-center py-2">
        
                    <IoIosArrowRoundBack className="text-red-solid-950 text-3xl" />
        
                </div>
        
            )

    
    }

}

type MoneyDataCardIconProps = {
    
    cardType: MoneyCardType,
    icon?: ElementType
    
}


export const MoneyDataCardIcon = ({cardType}:MoneyDataCardIconProps) => {

    return (

        buildCardIcon(cardType)

    )


}