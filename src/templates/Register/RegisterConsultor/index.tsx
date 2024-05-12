import { RegisterConsultor } from "../../../components/Register/RegisterConsultor"
import { CONSULTORS } from "../../../constants/paths/paths";


export const RegisterConsultorTemplate = () => {

    return (
        
        <RegisterConsultor.Layout>

            <RegisterConsultor.Header
            heading="Cadastro de consultores"
            />
            
            <RegisterConsultor.Content>

                <RegisterConsultor.SubHeader
                    path={CONSULTORS}
                    linkText="voltar para consultores"
                    heading="Cadastrar um consultor"
                />

                <RegisterConsultor.Form />

            </RegisterConsultor.Content>

        </RegisterConsultor.Layout>

    );
}