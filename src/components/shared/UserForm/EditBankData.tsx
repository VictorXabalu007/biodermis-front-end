import { Controller, useFormContext } from "react-hook-form"
import { UserEditRole, UserEditType } from "../../../validations/updateUserValidation"
import { Col, Row } from "antd"
import { Form } from "../Form"
import { Input } from "../Input/Input"
import { FormItem } from "../Form/FormItem"
import Select from "../Input/Select"
import { BANK_OPS } from "../../../constants/SessionStorageKeys/sessionStorageKeys"
import { Options } from "../../../@types/Options/Options"

const EditBankData = () => {


  const {
    getValues,
    formState:{errors},
    control
  } = useFormContext<UserEditType>();

  const isUser = getValues().userType === UserEditRole.UserClient
  const {
    account,
    agency,
    bank,
    pixkey
  } = getValues().bankData

  const bankOps: Options[] = JSON.parse(sessionStorage.getItem(BANK_OPS) ?? '[]') || [];

  return (
   <Row gutter={[20,20]}>

    <Col lg={24}>
    
    <Controller
                control={control}
                name="bankData.agency"
                defaultValue={agency}
                render={({field})=> (

                    <FormItem
                    name={field.name}
                    validateStatus={errors.bankData?.agency ? 'error' : 'success'}
                    help={errors.bankData?.agency && errors.bankData.agency.message}
                    hasFeedback
                    >

                        <Form.InputWrapper>
                            
                            <Input.Root>
                                
                                <Input.Label 
                                className="text-gray-neutral-400"
                                content="Agência"
                                htmlFor="agency"
                                />
                                <Input.System
                              
                                id="agency"
                                {...field}
                                />


                            </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>




                )}
                />
    </Col>

    <Col lg={12}>
    
    <Controller
                control={control}
                name="bankData.pixkey"
                defaultValue={pixkey}
                render={({field})=> (

                    <FormItem
                    name="pix"
                    validateStatus={errors?.bankData?.pixkey ? 'error' : 'success'}
                    help={errors?.bankData?.pixkey && errors.bankData.pixkey.message}
                    hasFeedback
                    >

                        <Form.InputWrapper >

                                    <Input.Root>
                                        
                                        <Input.Label 
                                        className="text-gray-neutral-400"
                                        content="Chave pix"
                                        htmlFor="pixkey"
                                        />
                                        <Input.System
                                        
                                        id="pixkey"
                                        {...field}
                                        />


                                    </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>



                )}
                />
    </Col>
    <Col lg={12}>
    
    <Controller
                control={control}
                defaultValue={account}
                name="bankData.account"
                render={({field})=> (

                    <FormItem
                    name="conta"
                    validateStatus={errors?.bankData?.account ? 'error' : 'success'}
                    help={errors?.bankData?.account && errors.bankData.account.message}
                    hasFeedback
                    >

                        <Form.InputWrapper >

                                    <Input.Root>
                                        
                                        <Input.Label 
                                        className="text-gray-neutral-400"
                                        content="Conta"
                                        htmlFor="account"
                                        />
                                        <Input.System
                                     
                                        id="account"
                                        {...field}
                                        />


                                    </Input.Root>

                        </Form.InputWrapper>


                    </FormItem>



                )}
                />

    </Col>

    <Col lg={24}>
        

            
        <Controller 
          control={control}
          name="bankData.bank"
          defaultValue={bank}
          render={({ field: { onChange, name,value } }) => (
            <FormItem
              name={name}
              validateStatus={errors?.bankData?.bank ? 'error' : 'success'}
              help={errors?.bankData?.bank && errors.bankData.bank.message}
              hasFeedback
            >
              <Form.InputWrapper>
                <Input.Root>
                  <Input.Label 
                    content="Banco"
                    className="text-black"
                    htmlFor="bank"
                  />
                  <Select 
                    options={bankOps}
                    value={bankOps.find(option => option.value === value)} 
                    onChange={selectedOption => {
                      onChange(selectedOption.value); 
                    }}
                    onFocus={() => {
                      if (!value) {
                        onChange(bank);
                      }
                    }}
                    isDisabled={isUser}
                    isSearchable
                  />
                </Input.Root>
              </Form.InputWrapper>
            </FormItem>
          )}
        />
        
    
    </Col>


   </Row>
  )
}

export default EditBankData