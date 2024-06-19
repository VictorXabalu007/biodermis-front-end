import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";


const {Title,Text} = Typography;

export const NotFoundPage = () => {


    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <Flex gap={10} vertical style={{minHeight: '100vh', width: '100%'}} justify="center" align="center">
        
            <Title level={1} className="text-brand-purple">
                404
            </Title>
            <Text>
                URL não encontrada
            </Text>
            <Button type="text" onClick={handleGoBack}>

                Voltar para a ultima página
            
            </Button>
        
        
        </Flex>
    );

}