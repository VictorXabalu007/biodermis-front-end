import { Flex, Typography } from "antd"


const {Text} = Typography;

type SelectLabelProps = {
    afterBold: string
    onBold: string
}

export const SelectLabel = ({afterBold, onBold}:SelectLabelProps) => {


    return (
        <Flex gap={3}>
            <Text strong>
                {onBold}
            </Text>
            <Text>  
                {afterBold}
            </Text>
        </Flex>
    )
}