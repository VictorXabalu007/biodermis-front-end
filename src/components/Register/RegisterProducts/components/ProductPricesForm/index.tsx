import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";
import InputMoney from "../../../../shared/Input/InputNumber";



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
                    render={({field})=> {

                        return (
                            
                            <Input.Root>
    
                                <Input.Label 
                                content="Preço de venda"
                                className="text-gray-neutral-600"
                                htmlFor="sellPrice"
                                
                                />

                                <InputMoney
                                    id="sellPrice"
                                    prefix={"R$"}
                                    value={parseFloat(field.value)}
                                    onChange={field.onChange}
                                    className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                />
                                

                                {errors.sellPrice &&
                                    <small className="text-red-600">
                                        {errors.sellPrice.message}
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
                    name="minPrice"
                    render={({field})=> {

                        return (
                            
                            <Input.Root>
    
                                <Input.Label 
                                content="Preço mínimo"
                                className="text-gray-neutral-600"
                                htmlFor="minPrice"
                                
                                />

                                <InputMoney
                                    id="minPrice"
                                    prefix={"R$"}
                                    value={parseFloat(field.value)}
                                    onChange={field.onChange}
                                    className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                />
                                

                                {errors.minPrice &&
                                    <small className="text-red-600">
                                        {errors.minPrice.message}
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
                    name="maxPrice"
                    render={({field})=> {

                        return (
                            
                            <Input.Root>
    
                                <Input.Label 
                                content="Preço máximo"
                                className="text-gray-neutral-600"
                                htmlFor="maxPrice"
                                
                                />

                                <InputMoney
                                    id="maxPrice"
                                    prefix={"R$"}
                                    value={parseFloat(field.value)}
                                    onChange={field.onChange}
                                    className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                />
                                

                                {errors.maxPrice &&
                                    <small className="text-red-600">
                                        {errors.maxPrice.message}
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
                    name="ficticiousPrice"
                    render={({field})=> {

                        return (
                            
                            <Input.Root>
    
                                <Input.Label 
                                content="Preço máximo"
                                className="text-gray-neutral-600"
                                htmlFor="ficticiousPrice"
                                
                                />

                                <InputMoney
                                    id="ficticiousPrice"
                                    prefix={"R$"}
                                    value={parseFloat(field.value)}
                                    onChange={field.onChange}
                                    className="rounded-md border py-2 px-2 border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                />
                                

                                {errors.ficticiousPrice &&
                                    <small className="text-red-600">
                                        {errors.ficticiousPrice.message}
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