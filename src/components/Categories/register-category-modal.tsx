
import { Form, Input } from "antd"
import { Control, Controller, FieldErrors, } from "react-hook-form";
import { CategoryRegisterType } from "../../hooks/categories/useCategoryRegister";



type Props = {
    control:Control<CategoryRegisterType>
    errors:FieldErrors<CategoryRegisterType>
}

export const FormModal = ({control,errors}:Props) => {

    
    return (



            <Controller 
                   name="categoria"
                   control={control}
                   render={({field})=>(

                    <Form.Item 
                        name="categoria"
                        validateStatus={errors.categoria ? 'error' : 'success'}
                        help={errors.categoria && errors.categoria.message}
                        hasFeedback
                        label="Nome da categoria"
                    >

                        <Input 
                            placeholder="ex: Cabelos"
                            {...field}
                        />

                    </Form.Item>

                    )}

                />


    );

}