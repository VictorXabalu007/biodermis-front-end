
import { RegisterFieldProps } from "../@types/RegisterFieldsProps";
import { usePixkey } from "../../../hooks/usePixkey";
import { Flex, Row, Col } from "antd";
import { BANK_OPS } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { Options } from "../../../@types/Options/Options";
import { UserData } from "../../../validations/registerUserValidation";
import { SubHeader } from "../../shared/SubHeader/sub-header";
import { colors } from "../../../theme/colors";
import { renderFormField, renderMaskFormField, renderSelectField } from "../../../functions/render-form-field";



export const BankDataForm = ({ errors, control }: RegisterFieldProps<UserData>) => {
  
  const bankOps: Options[] = JSON.parse(sessionStorage.getItem(BANK_OPS) ?? '[]') || [];

  const { pixKey, handlePixkeyChange } = usePixkey();

  const fields = [
    renderMaskFormField({
      fieldName:  "bankData.pix",
      label: "Pix",
      control:control,
      errors:errors,
      value:pixKey,
      onChange:handlePixkeyChange
    }),
    renderFormField("bankData.agencia", "Agência",control,errors, "text"),
    renderFormField("bankData.conta", "Conta",control,errors, "number"),
    renderSelectField({
      control,
      errors,
      fieldName: "bankData.banco",
      label: "Banco",
      options: bankOps,
      mode:'multiple'
    }),
  ];

  return (
    <Flex vertical>


        <SubHeader 
          heading='Dados bancários'
          hasLink={false}
          style={{
            color:colors.primaryPurple
          }}
          subtext='Informe os dados bancários do novo usuário'
        />

        
      <Row gutter={[16,16]}>
          {fields.map((f, key)=> (
            <Col lg={12} key={key}>
              {f}
            </Col>
          ))}
      </Row>

    </Flex>

  );

};
