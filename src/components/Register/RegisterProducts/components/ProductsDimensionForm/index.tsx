import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";
import { FormItem } from "../../../../shared/Form/FormItem";



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
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'weight'}
                            validateStatus={errors.weight ? 'error' : 'success'}
                            help={errors.weight && errors.weight.message}
                            hasFeedback
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Peso"
                                    className="text-gray-neutral-600"
                                    htmlFor="weight"
                                    
                                    />

                                    <Input.System 
                                    placeholder="ex: 10kg"
                                    id="weight"
                                    onChange={onChange}

                                    />
                                
                                </Input.Root>


                            </FormItem>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="height"
                    render={({field:{onChange}})=> {

                        return (
                            <FormItem
                            name={'height'}
                            validateStatus={errors.height ? 'error' : 'success'}
                            help={errors.height && errors.height.message}
                            hasFeedback
                            >
                                <Input.Root>
        
                                    <Input.Label 
                                    content="Altura"
                                    className="text-gray-neutral-600"
                                    htmlFor="height"
                                    
                                    />

                                    <Input.System 
                                    placeholder="ex: 10cm"
                                    id="height"
                                    onChange={onChange}

                                    />
                                </Input.Root>


                            </FormItem>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="width"
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'width'}
                            validateStatus={errors.width ? 'error' : 'success'}
                            help={errors.width && errors.width.message}
                            hasFeedback
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Largura"
                                    className="text-gray-neutral-600"
                                    htmlFor="width"
                                    
                                    />

                                    <Input.System 
                                    placeholder="ex: 10cm"
                                    id="width"
                                    onChange={onChange}

                                    />

                                </Input.Root>


                            </FormItem>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="depth"
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'depth'}
                            validateStatus={errors.depth ? 'error' : 'success'}
                            help={errors.depth && errors.depth.message}
                            hasFeedback
                            
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Profundidade"
                                    className="text-gray-neutral-600"
                                    htmlFor="depth"
                                    
                                    />

                                    <Input.System 
                                    placeholder="ex: 10cm"
                                    id="depth"
                                    onChange={onChange}

                                    />
 
                                </Input.Root>


                            </FormItem>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

          
            </Form.Group>



        </Form.GroupWrapper>

    );
}