import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";



export const ProductsDimensionForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {


    return (

        <Form.GroupWrapper>

            <Form.SubHeader 
                heading="Dimensões"
                subtext="Informe a quantidade em estoque e o SKU"
            />

            <Form.Group>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="weight"
                    render={({field})=> {

                        return (
                            <Input.Root>
    
                                <Input.Label 
                                content="Peso"
                                className="text-gray-neutral-600"
                                htmlFor="weight"
                                
                                />

                                <Input.System 
                                placeholder="ex: 10kg"
                                id="weight"
                                onChange={(e)=> {
                                    field.onChange(e.target.value)
                                }}

                                />

                                {errors.weight &&
                                    <small className="text-red-600">
                                        {errors.weight.message}
                                    </small>

                                }
                            
                            </Input.Root>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="height"
                    render={({field})=> {

                        return (
                            <Input.Root>
    
                                <Input.Label 
                                content="Altura"
                                className="text-gray-neutral-600"
                                htmlFor="height"
                                
                                />

                                <Input.System 
                                placeholder="ex: 10cm"
                                id="height"
                                onChange={(e)=> {
                                    field.onChange(e.target.value)
                                }}

                                />

                                {errors.height &&
                                    <small className="text-red-600">
                                        {errors.height.message}
                                    </small>

                                }
                            
                            </Input.Root>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="width"
                    render={({field})=> {

                        return (
                            <Input.Root>
    
                                <Input.Label 
                                content="Largura"
                                className="text-gray-neutral-600"
                                htmlFor="width"
                                
                                />

                                <Input.System 
                                placeholder="ex: 10cm"
                                id="width"
                                onChange={(e)=> {
                                    field.onChange(e.target.value)
                                }}

                                />

                                {errors.width &&
                                    <small className="text-red-600">
                                        {errors.width.message}
                                    </small>

                                }
                            
                            </Input.Root>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="depth"
                    render={({field})=> {

                        return (
                            <Input.Root>
    
                                <Input.Label 
                                content="Profundidade"
                                className="text-gray-neutral-600"
                                htmlFor="depth"
                                
                                />

                                <Input.System 
                                placeholder="ex: 10cm"
                                id="depth"
                                onChange={(e)=> {
                                    field.onChange(e.target.value)
                                }}

                                />

                                {errors.depth &&
                                    <small className="text-red-600">
                                        {errors.depth.message}
                                    </small>

                                }
                            
                            </Input.Root>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

          
            </Form.Group>



        </Form.GroupWrapper>

    );
}