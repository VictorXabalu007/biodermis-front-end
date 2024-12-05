import { RegisterConsultor } from "../../../components/Register/RegisterConsultor";
import { useStateTheme } from "../../../context/ThemeProvider";

export const RegisterConsultorTemplate = () => {
	const { setTitle } = useStateTheme();
	setTitle("Cadastro de usuários");

	return (
		<>
			<RegisterConsultor.SubHeader
				linkText="voltar"
				heading="Cadastrar um Usuário"
			/>

			<RegisterConsultor.Form />
		</>
	);
};
