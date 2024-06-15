import { Flex, Typography } from "antd"
import { useURLParams } from "../../../../hooks/useURLParams/useURLParams";
import { useEffect, useState } from "react";


const {Title} = Typography;

export const MercardoPagoSuccess = () => {

    const query = useURLParams();

    const status= query.get('status')  || null;
 
    const [payment_data, setPaymentData] = useState({})

    useEffect(()=> {

        if(status && status === 'approved') {

            setPaymentData(
                {

                    payment_id: query.get('payment_id'),
                    status: status,
                    payment_type: query.get('payment_type'),
                    preference_id: query.get('preference_id')
             
                }
            );

        }
        

    },[status]);


    
    
    return (

        <Flex vertical gap={3} style={{width: '100%', minHeight: '100vh'}} justify="center" align="center">

            <Title>
                Sucesso na compra!
            </Title>


       </Flex>

    );

}