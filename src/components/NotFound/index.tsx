import { Flex, Typography } from "antd";
import { Link } from "../shared/Link";
import { HOME } from "../../constants/paths/paths";


const {Title,Text} = Typography;

export const NotFoundPage = () => {



    return (
        <Flex gap={10} vertical style={{minHeight: '100vh', width: '100%'}} justify="center" align="center">
        
            <Title level={1} className="text-brand-purple">
                404
            </Title>
            <Text>
                URL não encontrada
            </Text>
            <Link.Root path={HOME}>

                Voltar para a home
            
            </Link.Root>
        
        
        </Flex>
    );

}