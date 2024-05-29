import { RegisterConsultor } from "../../../components/Register/RegisterConsultor"
import {  HOME } from "../../../constants/paths/paths";


export const RegisterConsultorTemplate = () => {

    return (
        
        <RegisterConsultor.Layout>

            <RegisterConsultor.Header
            heading="Cadastro de Usuários"
            />
            
            <RegisterConsultor.Content>

                <RegisterConsultor.SubHeader
                    path={HOME}
                    linkText="voltar"
                    heading="Cadastrar um Usuário"
                />

                <RegisterConsultor.Form />

            </RegisterConsultor.Content>

        </RegisterConsultor.Layout>

    );
}