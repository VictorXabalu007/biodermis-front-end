
import { Flex } from "antd";
import { Text } from "../../Text";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { RequestStatusChange } from "../../../Requests/hooks/useRequestsData";


type PercentualProps = {
    percentual: string;
    status: RequestStatusChange | null
}

export const StatsCardPercentual = ({percentual, status}:PercentualProps) => {

    const getClassName = () => {
        switch(status){
            case 'increase':
                return 'text-green-solid-900 fill-green-solid-900 bg-green-solid-300'
            case 'decrease':
                return 'text-red-solid-800 fill-red-solid-800 bg-red-solid-400'
            case 'no change': 
                return 'text-yeallow-solid-900 fill-yeallow-solid-900 bg-yeallow-solid-400'
        }
    }

    return (
        
    

        <Flex className="py-2">

            <div style={{minHeight: '30px'}} className={`rounded-xl px-2 items-center flex gap-2 ${getClassName()}`}>
                    
                    {status !== null && status === 'increase' ? <>
                        <FaArrowTrendUp className="text-xl" />
                    
                    </> : status === 'decrease' ? <FaArrowTrendDown className="text-xl" /> : 
                    
                    <>
                        
                    </>
                    }
                    {status!==null &&
                    
                        <Text.Root className={`${getClassName()} font-bold`}>
                            <Text.Content content={parseFloat(percentual).toFixed()}/>%
                        </Text.Root>
                    }
                    
             </div>

        </Flex>     

    
    )
}