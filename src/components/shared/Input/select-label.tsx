import { Flex, Typography } from "antd"


const {Text} = Typography;

type SelectLabelProps = {
    afterBold: string | React.ReactNode
    onBold: string
}

export const SelectLabel = ({afterBold, onBold}:SelectLabelProps) => {


    return (
        <Flex gap={10}>
            <Text strong>
                {onBold}
            </Text>
            <Text>  
                {afterBold}
            </Text>
        </Flex>
    )
}