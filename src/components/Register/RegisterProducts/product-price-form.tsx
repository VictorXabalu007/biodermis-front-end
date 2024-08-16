
import { RegisterFieldProps } from "../@types/RegisterFieldsProps";
import { ProductsData } from "../../../validations/registerProductValidation";
import { Flex } from "antd";
import { SubHeader } from "../../shared/SubHeader/sub-header";
import { colors } from "../../../theme/colors";
import { renderFormField } from "../../../functions/render-form-field";



export const ProductsPricesForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {

    const fields = [

        renderFormField("sellPrice","Preço de venda",control,errors, "money"),
        renderFormField("minPrice","Preço mínimo",control,errors, "money"),
        renderFormField("maxPrice","Preço máximo",control,errors, "money"),
    ]

    return (

        <Flex vertical>

            <SubHeader 
                heading="Preços"
                subtext="Informe os preços do produto"
                hasLink={false}
                style={{
                    color:colors.primaryPurple
                }}
            />

            <Flex align="center" gap={10}>
                
                {fields.map(f => (
                    f
                ))}

            </Flex>


        </Flex>

    );
}