import { RegisterConsultor } from "../../../components/Register/RegisterConsultor"
import { DEFAULT_PATH } from "../../../constants/paths/paths";


export const RegisterConsultorTemplate = () => {

    return (
        
        <RegisterConsultor.Layout>

            <RegisterConsultor.Header
            heading="Cadastro de Usuários"
            />
            
            <RegisterConsultor.Content>

                <RegisterConsultor.SubHeader
                    path={DEFAULT_PATH}
                    linkText="voltar"
                    heading="Cadastrar um Usuário"
                />

                <RegisterConsultor.Form />

            </RegisterConsultor.Content>

        </RegisterConsultor.Layout>

    );
}