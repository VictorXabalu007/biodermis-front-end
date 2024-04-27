
import { Text } from "../../Text";
import { FaArrowTrendUp } from "react-icons/fa6";



type PercentualProps = {
    percentual: string;
}

export const StatsCardPercentual = ({percentual}:PercentualProps) => {
    return (
        <div className="p-3">
                    
            <div className="rounded-xl items-center flex gap-2 text-green-solid-800 py-1 px-2 bg-green-300/25">
                    <FaArrowTrendUp className="text-xl" />
                    <Text.Root className="text-green-solid-800 font-bold">
                        <Text.Content content={percentual}/>
                    </Text.Root>
             </div>

        </div>
    )
}