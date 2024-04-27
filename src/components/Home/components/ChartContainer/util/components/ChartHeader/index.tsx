import { FaMoneyBills } from "react-icons/fa6"
import { Heading } from "../../../../../../shared/Heading"


export const ChartHeader = () => {
    return (

        <div className="flex justify-between w-full p-3">

            <div className="flex gap-3 items-center">
                <div className="rounded-md p-3 bg-brand-purple/25">
                    <FaMoneyBills className="text-brand-purple text-lg fw-bold" />
                </div>

                <Heading.Root>
                    <Heading.Content content="Faturamento mensal (entradas e saídas)" />
                </Heading.Root>
            </div>

            <div>
        
            </div>

        </div>

    )
}