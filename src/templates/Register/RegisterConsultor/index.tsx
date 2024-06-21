import { RegisterConsultor } from "../../../components/Register/RegisterConsultor"


export const RegisterConsultorTemplate = () => {

    return (
        
        <RegisterConsultor.Layout>

            <RegisterConsultor.Header
            heading="Cadastro de Usuários"
            />
            
            <RegisterConsultor.Content>

                <RegisterConsultor.SubHeader
                    linkText="voltar"
                    heading="Cadastrar um Usuário"
                />

                <RegisterConsultor.Form />

            </RegisterConsultor.Content>

        </RegisterConsultor.Layout>

    );
}