import { Controller } from "react-hook-form";
import { Form } from "../../../../shared/Form";
import { Input } from "../../../../shared/Input/Input";
import { RegisterFieldProps } from "../../../@types/RegisterFieldsProps";
import { ProductsData } from "../FormContainer";
import TextArea from "antd/es/input/TextArea";
import { FormItem } from "../../../../shared/Form/FormItem";
import Select from "../../../../shared/Input/Select";
import { useCategoriesData } from "../../../../Categories/hooks/useCategoriesData";


export const ProductsDescForm = ({control,errors}:RegisterFieldProps<ProductsData>) => {

    const {getCategoriesOptions} = useCategoriesData();

    const categoriesOptions = getCategoriesOptions();
    
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
                                    isSearchable
                                    options={categoriesOptions}
                                    defaultValue={categoriesOptions[0]}
                                    // @ts-ignore
                                    onChange={(selectedOption) => onChange(selectedOption?.value)}
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