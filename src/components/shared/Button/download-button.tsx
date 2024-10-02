import { Button, ButtonProps, Tooltip } from "antd"
import { FiPrinter } from "react-icons/fi"
import { colors } from "../../../theme/colors"


type Props = {
  outlined?:boolean
} & ButtonProps

const DowloadButton = ({title="download pdf",outlined = true,...rest}:Props) => {
  return (
    <Tooltip title={title}>
    <Button
      style={{
        background: "transparent",
        padding: outlined ? ".3em": 0,
        border: outlined ? `1px solid ${colors.gray}` : "none",
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