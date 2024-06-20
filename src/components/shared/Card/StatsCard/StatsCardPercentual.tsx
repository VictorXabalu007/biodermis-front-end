
import { Flex } from "antd";
import { Text } from "../../Text";
import { FaArrowTrendUp } from "react-icons/fa6";



type PercentualProps = {
    percentual: string;
}

export const StatsCardPercentual = ({percentual}:PercentualProps) => {
    return (
    
        <Flex className="py-2">

            <div style={{minHeight: '30px'}} className="rounded-xl px-2 items-center flex gap-2 text-green-solid-800 bg-green-300/25">
                    <FaArrowTrendUp className="text-xl" />
                    <Text.Root className="text-green-solid-800 font-bold">
                        <Text.Content content={percentual}/>
                    </Text.Root>
             </div>

        </Flex>     

    
    )
}