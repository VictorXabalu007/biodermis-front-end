import { Radio, Col, Row } from "antd";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { Controller } from "react-hook-form";
import {  UserRole } from "../../../../../../../util/UserRole";
import { Form } from "../../../../../../shared/Form";

const items = [
    {   
        key: '1',
        value:UserRole.ADMIN,
        label: 'Admin'
    },
    {   
        key: '2',
        value:UserRole.MANAGER,
        label: 'Gerente'
    },
    {   
        key: '3',
        value:UserRole.CONSULTOR,
        label: 'Consultor'
    },
    {   
        key: '4',
        value:UserRole.STOCK,
        label: 'Estoque'
    },
]

export const Checkboxes = ({errors, control}: RegisterFieldProps) => {

    return (

        <Radio.Group
            className="my-10 flex flex-col"
            defaultValue={"admin"}
        >


            <Form.SubHeader 
            heading="Tipo de usuário"
            subtext="Informe o tipo de usuário que você quer cadastrar"
            />

            <Controller 
                control={control}
                name="userRole"
                render={({ field }) => (

                    <>
                    
                    <Row>
                        {items.map(item => (
                            <Col span={6} key={item.key}>
                                <Radio 
                                    
                                    value={item.value} 
                                    style={{ lineHeight: '32px' }}
                                    onChange={(e) => {
                                        
                                        field.onChange(e.target.value)
                                    }}
                                >
                                    {item.label}
                                </Radio>
                            </Col>
                        ))}
                    </Row>

                    <>
                    
                    {errors.userRole && (
                        <p className="text-red-600">
                            {errors.userRole.message} 
                        </p>
                    )}
                    
                    </>
                    
                    </>
                )}
            />
         
        </Radio.Group>
    );
}
