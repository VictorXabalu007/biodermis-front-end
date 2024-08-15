


import { Button, ButtonProps, Tooltip } from 'antd'
import { FaEye } from 'react-icons/fa6'
import { colors } from '../../../theme/colors'


const EyeButton = ({...rest}:ButtonProps) => {

  return (
    
    <Tooltip trigger={'hover'} title="Visualizar">

        <Button 
        size='small' 
        {...rest}
        style={{
            background:'transparent',
            padding:'.3em'
        }}
        >
            <FaEye color={colors.primaryPurple} />
        </Button>

    </Tooltip>

  )

}

export default EyeButton