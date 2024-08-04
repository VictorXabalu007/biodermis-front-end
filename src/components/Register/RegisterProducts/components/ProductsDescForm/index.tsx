import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import TextArea from "antd/es/input/TextArea";
import { FormItem } from "../../../../shared/Form/FormItem";

import { CategoryType } from "../../../../Categories/service/getCategory";
import { CATEGORIES } from "../../../../../constants/SessionStorageKeys/sessionStorageKeys";
import { Select } from "antd";
import { ProductsData } from "../../../../../validations/registerProductValidation";




export const ProductsDescForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {

    const dataCategories:CategoryType[] = JSON.parse(sessionStorage.getItem(CATEGORIES) ?? '{}') || []
    

    const categories = [
        ...dataCategories.map(d => ({
            value: d.id,
            label: d.categoria
        }))
    ]

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
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'productName'}
                            validateStatus={errors.productName ? 'error' : 'success'}
                            help={errors.productName && errors.productName.message}
                            hasFeedback
                            >
                                <Input.Root>
        
                                    <Input.Label 
                                    content="Nome do produto"
                                    className="text-gray-neutral-600"
                                    htmlFor="productName"
                                    
                                    />

                                    <Input.System 
                                    placeholder="ex: Filtro solar"
                                    id="productName"
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
                    name="category"
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'category'}
                            validateStatus={errors.category ? 'error' : 'success'}
                            help={errors.category && errors.category.message}
                            hasFeedback
                            >

                                <Input.Root>
        
                                    <Input.Label 
                                    content="Categoria"
                                    className="text-gray-neutral-600"
                                    htmlFor="category"
                                    
                                    />

                                <Select
                                        mode="multiple"
                                        placeholder="Selecione"
                                        onChange={(e)=>onChange(e)}
                                        style={{ width: '100%' }}
                                        options={categories}
                                        />

                                </Input.Root>

                            </FormItem>
                        )
                    }}
                    
                    />

                </Form.InputWrapper>

                <Form.InputWrapper >

                    <Controller
                    
                    control={control}
                    name="description"
                    render={({field:{onChange}})=> {

                        return (

                            <FormItem
                            name={'description'}
                            validateStatus={errors.description ? 'error' : 'success'}
                            help={errors.description && errors.description.message}
                            hasFeedback
                            >


                            <label
                            htmlFor="description"
                            >
                                Descrição
                            </label>
                            
                            <TextArea 
                            className="hover:border-brand-purple"
                            style={{resize: 'none'}}
                            placeholder="Produto com..."
                            rows={4} 
                            onChange={onChange}
                            id="description"
                            />

                            
                            </FormItem>
            
                         
                        )
                    }}
                    
                    />

                </Form.InputWrapper>



            </Form.Group>


        </Form.GroupWrapper>

    );
}