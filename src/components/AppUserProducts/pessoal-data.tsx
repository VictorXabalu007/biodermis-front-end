import { useState } from "react";
import type { UserData } from "../../validations/registerUserValidation";
import { formatFieldValueInCpf } from "../../functions/Formatters/FormatCPF/formatValueInCpf";
import { formatInPhoneNumber } from "../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
import {
	renderFormField,
	renderMaskFormField,
} from "../../functions/render-form-field";
import { SubHeader } from "../shared/SubHeader/sub-header";
import { Col, Row } from "antd";
import { colors } from "../../theme/colors";

export const PessoalDataFormApp = ({
	errors,
	control,
}: RegisterFieldProps<UserData>) => {
	const [cpf, setCpf] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedCpf = formatFieldValueInCpf(e.target.value);
		setCpf(formattedCpf);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedPhone = formatInPhoneNumber(e.target.value);
		setPhoneNumber(formattedPhone);
	};

	const fields = [
		renderFormField("nome", "Nome", control, errors, "text"),
		renderMaskFormField({
			fieldName: "cpf",
			label: "CPF",
			control: control,
			errors: errors,
			onChange: handleCpfChange,
			value: cpf,
		}),
		renderFormField("email", "E-mail", control, errors, "text"),
		renderMaskFormField({
			fieldName: "telefone",
			label: "Telefone",
			control: control,
			errors: errors,
			onChange: handlePhoneChange,
			value: phoneNumber,
		}),
	];

	return (
		<>
			<SubHeader
				heading="Dados Pessoais"
				hasLink={false}
				style={{ color: colors.primaryPurple }}
				subtext="Informe os dados pessoais do novo usuário"
			/>
			<Row gutter={[16, 16]}>
				{fields.map((f, key) => (
					<Col lg={12} key={key}>
						{f}
					</Col>
				))}
			</Row>
		</>
	);
};
