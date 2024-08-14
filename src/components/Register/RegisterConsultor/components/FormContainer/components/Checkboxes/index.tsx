import { Radio, Col, Row } from "antd";
import { RegisterFieldProps } from "../../../../../@types/RegisterFieldsProps";
import { Controller } from "react-hook-form";
import {  UserRole } from "../../../../../../../util/userRole";
import { Form } from "../../../../../../shared/Form";
import { FormItem } from "../../../../../../shared/Form/FormItem";
import { UserData } from "../../../../../../../validations/registerUserValidation";


export const Checkboxes = ({control}: RegisterFieldProps<UserData>) => {

    

    return (

        <div>

            <Form.SubHeader 
            heading="Tipo de usuário"
            subtext="Informe o tipo de usuário que você quer cadastrar"
            />

            <Controller 
                defaultValue={UserRole.ADMIN}
                control={control}
                name="cargo_id"
                render={({ field:{onChange} }) => (

                    <FormItem
                    name={"cargo_id"}
                    >

                          <Radio.Group  
                          className="my-10 flex flex-col" 
                          defaultValue={UserRole.ADMIN}>

                            <Row className="gap-10">

                                <Col lg={3} span={3}>

                                <Radio onChange={onChange} value={UserRole.ADMIN}>Admin</Radio>

                                </Col>

                                <Col lg={3}  span={3}>
                                
                                <Radio onChange={onChange} value={UserRole.CONSULTOR}>Consultor</Radio>

                                </Col>

                                <Col lg={3}  span={3}>

                                <Radio onChange={onChange} value={UserRole.STOCK}>Estoque</Radio>

                                
                                </Col>


                                <Col lg={3} span={3}>

                                    <Radio onChange={onChange}value={UserRole.MANAGER}>Gerente</Radio>
                                
                                </Col>

                                <Col lg={3} span={3}>

                                    <Radio onChange={onChange}value={UserRole.USER}>Cliente</Radio>
                                
                                </Col>

                            </Row>


                        </Radio.Group>
             
                    
                    </FormItem>
                )}
            />
         
         </div>
    );
}
