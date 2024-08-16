import { Button, ButtonProps, Tooltip } from "antd"
import { TbBrandWhatsapp } from "react-icons/tb";
import { colors } from "../../../theme/colors";


const WhatzapButton = ({...rest}:ButtonProps) => {

  return (  
      <Tooltip trigger={'hover'} title="Contato">

            <Button 
              size="small"
                style={{
                  background: "transparent",
                  padding: ".3em",
                }}
                {...rest}
              >
                <TbBrandWhatsapp color={colors.primaryPurple} />
            </Button>  

      </Tooltip>

  );

}

export default WhatzapButton