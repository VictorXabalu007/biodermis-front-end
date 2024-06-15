import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { Button } from "../../../shared/Button";
import { Modal } from "antd";
import { WithDrawalModal } from "../Modal";
import { BRAND_PURPLE } from "../../../../constants/classnames/classnames";
import { WithDrawal } from "../../util/withdrawalData";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../service/queryClient";



export const WithdrawalActions = ({withdraw}:{withdraw:WithDrawal}) => {

    
    const { confirm } = Modal;

    const showRequestStats = () => {

        confirm({

            content:
            <QueryClientProvider client={queryClient}>
                <WithDrawalModal 
               withdraw={withdraw}
               handleClose={() => Modal.destroyAll()} />
            </QueryClientProvider>
            ,
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