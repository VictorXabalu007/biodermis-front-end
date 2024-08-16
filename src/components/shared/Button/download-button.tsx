import { Button, ButtonProps, Tooltip } from "antd"
import { FiPrinter } from "react-icons/fi"
import { colors } from "../../../theme/colors"




const DowloadButton = ({...rest}:ButtonProps) => {
  return (
    <Tooltip title="Download pdf">
    <Button
      style={{
        background: "transparent",
        padding: ".3em",
      }}
      size="small"
      {...rest}

    >
      <FiPrinter
     
        color={colors.primaryPurple}
      />
    </Button>
  </Tooltip>
  )
}

export default DowloadButton