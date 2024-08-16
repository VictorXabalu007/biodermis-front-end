
import { RegisterFieldProps } from "../@types/RegisterFieldsProps";
import { ProductsData } from "../../../validations/registerProductValidation";
import { Col, Flex, Row } from "antd";
import { SubHeader } from "../../shared/SubHeader/sub-header";
import { colors } from "../../../theme/colors";
import { renderFormField } from "../../../functions/render-form-field";



export const ProductsDimensionForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {


    const fields = [

        renderFormField("weight","Peso",control,errors, "number"),
        renderFormField("height","Altura",control,errors, "number"),
        renderFormField("width","Largura",control,errors, "number"),
        renderFormField("depth","Profundidade",control,errors, "number"),
    ]

    return (

        <Flex vertical>

            <SubHeader 
                heading="Dimensões"
                subtext="Informe a quantidade em estoque e o SKU"
                hasLink={false}
                style={{
                    color:colors.primaryPurple
                }}
            />

            <Row gutter={[16,16]}>
                {fields.map((f,key)=> (
                    <Col lg={12} key={key}>
                        {f}
                    </Col>
                ))}
            </Row>


        </Flex>

    );
}