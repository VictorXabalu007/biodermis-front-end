import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";
import TextArea from "antd/es/input/TextArea";



export const ProductsDescForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {


    return (

        <Form.GroupWrapper>

            <Form.SubHeader 
                heading="Descrição"
                subtext="Informe o nome e descrição do novo produto"
            />

            <Form.Group
            className="flex flex-col"
            >

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="productName"
                    render={({field})=> {

                        return (
                            <Input.Root>
    
                                <Input.Label 
                                content="Nome do produto"
                                className="text-gray-neutral-600"
                                htmlFor="productName"
                                
                                />

                                <Input.System 
                                placeholder="ex: Filtro solar"
                                id="productName"
                                onChange={(e)=> {
                                    field.onChange(e.target.value)
                                }}

                                />

                                {errors.productName &&
                                    <small className="text-red-600">
                                        {errors.productName.message}
                                    </small>

                                }
                            
                            </Input.Root>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper >

                    <Controller
                    
                    control={control}
                    name="description"
                    render={({field})=> {

                        return (

                            <>

                            <label
                            htmlFor="description"
                            >
                                Descrição
                            </label>
                            
                            <TextArea 
                            placeholder="Produto com..."
                            rows={4} 
                            onChange={(e)=>{
                                field.onChange(e.target.value)
                            }}
                            id="description"
                            />

                               
                                {errors.description &&

                                    <small className="text-red-600">
                                        {errors.description.message}
                                    </small>

                                }
                            </>
            
                         
                        )
                    }}
                    
                    />

                </Form.InputWrapper>



            </Form.Group>



        </Form.GroupWrapper>

    );
}