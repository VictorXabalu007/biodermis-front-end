import { LuNewspaper } from "react-icons/lu";

import { MdOutlinePix } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { ElementType } from "react";
import { NumericFormatter } from "../../shared/Formatter/numeric-formatter";



type TotalValueProps = {

    value:string;
    icon: ElementType;
}

const TotalValueComponent = ({value, icon:Icon}:TotalValueProps) => {
    
    return (
            <div className="flex gap-2 justify-center items-center">
                <NumericFormatter value={parseFloat(value)} />
                <Icon className="text-[15px]"/>
            </div>
        );
    
}


export const buildTotalValue = (value: string, paymentType: number | null) => {

    switch(paymentType){
        case 1:
            return (
                <TotalValueComponent icon={MdOutlinePix} value={value} />
            );

        case 2:
            return (

                <TotalValueComponent icon={FiCreditCard} value={value} />

            );

        case 3:

            return (
                <TotalValueComponent icon={FiCreditCard} value={value} />
            );
            
        default: 
            return (
                <TotalValueComponent icon={LuNewspaper} value={value} />
            );
    }

}