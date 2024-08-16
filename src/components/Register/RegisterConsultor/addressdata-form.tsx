
import { RegisterFieldProps } from "../@types/RegisterFieldsProps";
import { Flex, Row, Col } from "antd";
import { UserData } from "../../../validations/registerUserValidation";
import { SubHeader } from "../../shared/SubHeader";
import { colors } from "../../../theme/colors";
import { renderFormField } from "../../../functions/render-form-field";

export const AddressDataForm = ({ errors, control }: RegisterFieldProps<UserData>) => {

  const fields = [
    renderFormField("cep", "CEP",control,errors, "text"),
    renderFormField("rua", "Rua",control,errors, "text"),
    renderFormField("cidade", "Cidade",control,errors, "text"),
    renderFormField("numero", "Numero",control,errors, "text"),
    renderFormField("complemento", "Complemento",control,errors, "text"),
    renderFormField("bairro", "Bairro",control,errors, "text"),
    renderFormField("estado", "Estado",control,errors, "text"),
  ];

  return (

    <Flex vertical>
         
      <SubHeader 
          heading='Endereço'
          hasLink={false}
          style={{
            color:colors.primaryPurple
          }}
          subtext='Informe os dados de endereço do novo usuário'
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
