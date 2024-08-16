
import { RegisterFieldProps } from "../@types/RegisterFieldsProps";


import { CategoryType } from "../../Categories/service/getCategory";
import { CATEGORIES } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { Flex, Form } from "antd";
import { ProductsData } from "../../../validations/registerProductValidation";
import { SubHeader } from "../../shared/SubHeader";
import { colors } from "../../../theme/colors";
import { renderFormField, renderSelectField } from "../../../functions/render-form-field";
import { Controller } from "react-hook-form";
import { QuillInput } from "../../shared/Input/QuillInput";




export const ProductsDescForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {

    const dataCategories:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? '{}') || []
    
    const categories = [
        ...dataCategories.map(d => ({
            value: d.id,
            label: d.categoria,
    
        }))
    ]

    const fields = [
        renderFormField("productName","Nome do produto",control,errors, "text"),
        renderSelectField({
            control,
            errors,
            fieldName: "category",
            label: "Categorias",
            //@ts-ignore
            options: categories,
            mode:'multiple'
        }),	
    ];



    return (

        <Flex gap={15} vertical>

 
              <SubHeader 
                heading='Descrição'
                hasLink={false}
                style={{
                    color:colors.primaryPurple
                }}
                subtext='Informe o nome e descrição do novo produto'
                />
                
                {fields.map((f)=> (
                    f
                ))}
          

          <Controller
                    
                    control={control}
                    name="description"
                    render={({field})=> {

                        return (

                            <Form.Item
                            name={'description'}
                            validateStatus={errors.description ? 'error' : 'success'}
                            help={errors.description && errors.description.message}
                            label="Descrição do produto"
                            >



                                <QuillInput
                                    className="mt-2"
                                    id="description"
                                    placeholder="Produto com..."
                                    onChange={(___, __, _, editor) => {
                                        
                                        const text = editor.getHTML();
                                        
                                        if(text === '<p><br></p>') {
                                            field.onChange('')
                                        } else {
                                            field.onChange(text);
                                        }
                                    
                                    }}
                                />

                            
                            </Form.Item>
            
                         
                        )
                    }}
                    
                    />
      
        </Flex>

    );
}