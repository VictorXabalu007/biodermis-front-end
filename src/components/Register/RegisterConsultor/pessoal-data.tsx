import { RegisterFieldProps } from "../@types/RegisterFieldsProps";
import { UserData } from "../../../validations/registerUserValidation";
import { SubHeader } from "../../shared/SubHeader";
import { colors } from "../../../theme/colors";
import { Row, Col } from "antd";
import { renderFormField, renderMaskFormField } from "../../../functions/render-form-field";
import { useState } from "react";
import { formatFieldValueInCpf } from "../../../functions/Formatters/FormatCPF/formatValueInCpf";
import { formatInPhone } from "../../../functions/Formatters/FormatPhoneNumber/formatValueInPhoneNumber";

export const PessoalDataForm = ({ errors, control }: RegisterFieldProps<UserData>) => {

  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatFieldValueInCpf(e.target.value);
    setCpf(formattedCpf);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatInPhone(e.target.value);
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
      value: cpf
    }),
    renderFormField("email", "E-mail", control, errors, "text"),
    renderMaskFormField({
      fieldName: "telefone",
      label: "Telefone",
      control: control,
      errors: errors,
      onChange: handlePhoneChange,
      value: phoneNumber
    }),
    renderFormField("senha", "Senha", control, errors, "text"),
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
