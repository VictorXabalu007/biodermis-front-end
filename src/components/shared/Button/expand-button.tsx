import { Button, ButtonProps, Tooltip } from "antd"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { colors } from "../../../theme/colors"


type Props = {
    isExpanded:boolean
} & ButtonProps

const ExpandButton = ({isExpanded,...rest}:Props) => {

  return (

    <Tooltip trigger={'hover'} title="Detalhes">

        <Button 
        size="small" 
        {...rest}
        style={{
            background:'transparent',
            padding:'.3em'
        }}
        >

            {isExpanded ?
            
            <IoIosArrowUp color={colors.primaryPurple} />
                :
            <IoIosArrowDown color={colors.primaryPurple} />

            }
            
        </Button>

    </Tooltip>

  );

}

export default ExpandButton