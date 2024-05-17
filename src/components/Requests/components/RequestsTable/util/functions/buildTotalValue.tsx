import { LuNewspaper } from "react-icons/lu";
import { PaymentType } from "../@types/PaymentType";
import { MdOutlinePix } from "react-icons/md";
import { FiCreditCard } from "react-icons/fi";
import { ElementType } from "react";
import { NumericFormatter } from "../../../../../shared/Formatter/NumericFormatter";


type TotalValueProps = {

    value:number;
    icon: ElementType;
}

const TotalValueComponent = ({value, icon:Icon}:TotalValueProps) => {
    
    return (
            <div className="flex gap-2 items-center">
                <NumericFormatter value={value} />
                <Icon className="text-[15px]"/>
            </div>
        );
    
}


export const buildTotalValue = (value: number, paymentType: PaymentType) => {

    switch(paymentType){
        case 'PIX':
            return (
                <TotalValueComponent icon={MdOutlinePix} value={value} />
            );

        case 'Cartão de crédito':
            return (

                <TotalValueComponent icon={FiCreditCard} value={value} />

            );

        case 'Boleto':

            return (
                <TotalValueComponent icon={LuNewspaper} value={value} />
            );
    }

}