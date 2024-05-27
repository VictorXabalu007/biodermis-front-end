import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { Button } from "../../../shared/Button";
import { Modal } from "antd";
import { WithDrawalModal } from "../Modal";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";



export const WithdrawalActions = ({rowIndex}:{rowIndex:number}) => {

    
    const { confirm } = Modal;

    const showRequestStats = () => {

        confirm({

            content: <WithDrawalModal rowIndex={rowIndex} handleClose={() => Modal.destroyAll()} />,
            closable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            width: '40%',
            maskClosable: true,
            

          });

    }



    return (

        
        <Button.Root 
                className="font-semibold"
                onClick={showRequestStats}
        >

                <Button.Wrapper>

                    <Button.Content content="Efetuar Pagamento" />
                    <Button.Icon icon={IoIosArrowForward } />

                </Button.Wrapper>

        </Button.Root>
        
  
    );


}