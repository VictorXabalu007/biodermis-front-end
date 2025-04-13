import { Col, Row } from "antd"
import { Controller, useFormContext } from "react-hook-form";
import { UserEditType } from "../../../validations/updateUserValidation";
import { Input } from "../Input/Input";
import { FormItem } from "../Form/FormItem";
import { GrLocation } from "react-icons/gr";
import { PatternFormat } from "react-number-format";
import { Form } from "../Form";


const EditAddressData = () => {

    const {
        getValues,
        formState: { errors },
        control
    } = useFormContext<UserEditType>()



    const {
        cep,
        city,
        neighboorhood,
        state,
        street,
        number,
        complement
    } = getValues().addressData
    console.log({ number })
    return (

        <Row gutter={[20, 20]}>

            <Col lg={24}>

                <Controller
                    control={control}
                    name="addressData.state"
                    rules={{ required: true }}
                    defaultValue={state}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors?.addressData?.state ? 'error' : 'success'}
                            help={errors?.addressData?.state && errors.addressData.state.message}

                        >

                            <Input.Root>

                                <Input.Label
                                    className="text-gray-neutral-400"
                                    content="Endereço"
                                    htmlFor="address"
                                />
                                <Input.System
                                    className="py-2"
                                    suffix={<GrLocation className="text-brand-purple" />}
                                    placeholder={'Endereço'}
                                    {...field}
                                />


                            </Input.Root>


                        </FormItem>


                    )}

                />
            </Col>

            <Col lg={12}>

                <Controller
                    control={control}
                    name="addressData.cep"
                    rules={{ required: true }}
                    defaultValue={cep}
                    render={({ field: { onChange, name } }) => (

                        <FormItem
                            name={name}
                            validateStatus={errors?.addressData?.cep ? 'error' : 'success'}
                            help={errors?.addressData?.cep && errors.addressData.cep.message}

                        >

                            <Form.InputWrapper>
                                <Input.Root>
                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="CEP"
                                        htmlFor="cep"
                                    />
                                    <PatternFormat
                                        format="#####-###"
                                        allowEmptyFormatting
                                        mask="_"
                                        className="rounded-md py-2 px-2 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                                        onChange={(e) => {

                                            onChange(e.target.value)
                                        }}
                                        // disabled={isUser}
                                        value={cep}
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
                    name="addressData.number"
                    rules={{ required: true }}
                    defaultValue={number}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors?.addressData?.number ? 'error' : 'success'}
                            help={errors?.addressData?.number && errors.addressData.number.message}

                        >

                            <Form.InputWrapper>

                                <Input.Root>

                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="Número"
                                        htmlFor="number"
                                    />

                                    <Input.System
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                        }}
                                        defaultValue={Number(number)}
                                        id="number"
                                        type="number"
                                    // disabled={isUser}
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
                    name="addressData.street"
                    rules={{ required: true }}
                    defaultValue={street}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors?.addressData?.street ? 'error' : 'success'}
                            help={errors.addressData?.street && errors.addressData.street.message}

                        >

                            <Form.InputWrapper>

                                <Input.Root>

                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="Rua"
                                        htmlFor="street"
                                    />
                                    <Input.System
                                        placeholder={'Rua do usuário'}
                                        id="street"
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
                    name="addressData.neighboorhood"
                    rules={{ required: true }}
                    defaultValue={neighboorhood}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors?.addressData?.neighboorhood ? 'error' : 'success'}
                            help={errors.addressData?.neighboorhood && errors.addressData?.neighboorhood.message}

                        >

                            <Form.InputWrapper>


                                <Input.Root>

                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="Bairro"
                                        htmlFor="neighborhood"
                                    />
                                    <Input.System
                                        id="neighborhood"
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
                    name="addressData.city"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={city}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors.addressData?.city ? 'error' : 'success'}
                            help={errors.addressData?.city && errors.addressData.city.message}

                        >

                            <Form.InputWrapper>

                                <Input.Root>

                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="Cidade"
                                        htmlFor="city"
                                    />
                                    <Input.System

                                        id="city"
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
                    name="addressData.complement"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={complement}
                    render={({ field }) => (

                        <FormItem
                            name={field.name}
                            validateStatus={errors.addressData?.complement ? 'error' : 'success'}
                            help={errors.addressData?.complement && errors.addressData.complement.message}

                        >

                            <Form.InputWrapper>

                                <Input.Root>

                                    <Input.Label
                                        className="text-gray-neutral-400"
                                        content="Complemento"
                                        htmlFor="complement"
                                    />
                                    <Input.System

                                        id="complement"
                                        {...field}



                                    />


                                </Input.Root>

                            </Form.InputWrapper>


                        </FormItem>



                    )}

                />

            </Col>

        </Row>

    );

}

export default EditAddressData