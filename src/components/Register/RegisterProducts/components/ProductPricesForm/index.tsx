import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";
import InputMoney from "../../../../shared/Input/InputNumber";
import { FormItem } from "../../../../shared/Form/FormItem";



export const ProductsPricesForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {


    return (

        <Form.GroupWrapper>

            <Form.SubHeader 
                heading="Preços"
                subtext="Informe os preços do produto"
            />

            <Form.Group
            className="flex"
            >

                <Form.InputWrapper>

                    <Controller
                    
                    control={control}
                    name="sellPrice"
                    render={({field:{value, onChange}})=> {

                        return (
                            
                            <FormItem
                            name={'sellPrice'}
                            validateStatus={errors.sellPrice ? 'error' : 'success'}
                            help={errors.sellPrice && errors.sellPrice.message}
                            hasFeedback
                            
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Preço de venda"
                                    className="text-gray-neutral-600"
                                    htmlFor="sellPrice"
                                    
                                    />

                                    <InputMoney
                                        id="sellPrice"
                                        prefix={"R$"}
                                        value={parseFloat(value)}
                                        onChange={onChange}
                                        className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
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
                    name="minPrice"
                    render={({field:{value, onChange}})=> {

                        return (

                            <FormItem
                            name={'minPrice'}
                            validateStatus={errors.minPrice ? 'error' : 'success'}
                            help={errors.minPrice && errors.minPrice.message}
                            hasFeedback
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Preço mínimo"
                                    className="text-gray-neutral-600"
                                    htmlFor="minPrice"
                                    
                                    />

                                    <InputMoney
                                        id="minPrice"
                                        prefix={"R$"}
                                        value={parseFloat(value)}
                                        onChange={onChange}
                                        className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
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
                    name="maxPrice"
                    render={({field:{onChange, value}})=> {

                        return (

                            <FormItem
                            name={'maxPrice'}
                            validateStatus={errors.maxPrice ? 'error' : 'success'}
                            help={errors.maxPrice && errors.maxPrice.message}
                            hasFeedback
                            
                            >
                                
                                <Input.Root>
        
                                    <Input.Label 
                                    content="Preço máximo"
                                    className="text-gray-neutral-600"
                                    htmlFor="maxPrice"
                                    
                                    />

                                    <InputMoney
                                        id="maxPrice"
                                        prefix={"R$"}
                                        value={parseFloat(value)}
                                        onChange={onChange}
                                        className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
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