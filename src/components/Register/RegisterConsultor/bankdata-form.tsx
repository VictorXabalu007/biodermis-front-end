
import { usePixkey } from "../../../hooks/usePixKey";
import { Flex, Row, Col } from "antd";
import { BANK_OPS } from "../../../constants/sessionStorageKeys";
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
