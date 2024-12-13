import { useState } from "react";
import type { UserData } from "../../validations/registerUserValidation";
import { formatFieldValueInCpf } from "../../functions/Formatters/FormatCPF/formatValueInCpf";
import { formatPhoneNumber } from "../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";
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
		const formattedPhone = formatPhoneNumber(e.target.value);
		setPhoneNumber(formattedPhone);
	};

	const fields = [
		renderFormField("nomecliente", "Nome", control, errors, "text"),
		renderMaskFormField({
			fieldName: "cpfcliente",
			label: "CPF",
			control: control,
			errors: errors,
			onChange: handleCpfChange,
			value: cpf,
		}),
		renderFormField("emailcliente", "E-mail", control, errors, "text"),
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
			<Row className="w-full" gutter={[10, 2]}>
				{fields.map((f, key) => (
					<Col lg={12} span={24} key={key} className="w-full">
						<div className="w-full">{f}</div>
					</Col>
				))}
			</Row>
		</>
	);
};
