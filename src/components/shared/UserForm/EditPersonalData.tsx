import { Col, Row } from "antd"
import { Controller, useFormContext } from "react-hook-form";
import { UserEditRole, UserEditType } from "../../../validations/updateUserValidation";
import { FormItem } from "../Form/FormItem";
import { Input } from "../Input/Input";
import { PatternFormat } from "react-number-format";
import { Form } from "../Form";
import { InputPassword } from "../Input/input-password";

const EditPersonalData = () => {

  const {
    formState: { errors },
    control,
    getValues,
  } = useFormContext<UserEditType>()

  const isUser = getValues().userType === UserEditRole.UserClient

  const {
    personalData
  } = getValues();

  const {
    cpf,
    email,
    name,
    password,
    phone,
  } = personalData

  console.log({ personalData })

  return (

    <Row className="mt-2" gutter={[20, 20]}>


      <Col lg={24}>

        <Controller
          name="personalData.name"
          control={control}
          rules={{ required: true }}
          defaultValue={name}
          render={({ field }) => (

            <FormItem
              className="w-full"

              validateStatus={errors?.personalData?.name ? 'error' : 'success'}
              help={errors?.personalData?.name && errors.personalData.name.message}
            >

              <Input.Root>

                <Input.Label
                  className="text-gray-neutral-400"
                  content="Nome"
                  htmlFor="name"
                />
                <Input.System
                  {...field}
                  id="name"



                />

              </Input.Root>

            </FormItem>

          )}
        />

      </Col>

      <Col lg={12}>

        <Controller
          name="personalData.cpf"
          control={control}
          rules={{ required: true }}
          defaultValue={cpf}
          render={({ field: { onChange } }) => (

            <FormItem
              className="w-full"
              name="personalData.cpf"
              validateStatus={errors?.personalData?.cpf ? 'error' : 'success'}
              help={errors?.personalData?.cpf && errors.personalData.cpf.message}
            >

              <Input.Root>

                <Input.Label
                  className="text-gray-neutral-400"
                  content="CPF"
                  htmlFor="cpf"
                />
                <PatternFormat

                  format="###.###.###-##"
                  allowEmptyFormatting
                  mask="_"
                  className="rounded-md py-2 px-1 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                  onChange={(e) => {

                    onChange(e.target.value);
                  }}
                  value={cpf}
                  disabled={isUser}



                />

              </Input.Root>

            </FormItem>

          )}
        />

      </Col>

      <Col lg={12}>

        <Controller
          name="personalData.phone"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (

            <FormItem
              className="w-full"
              name="personalData.phone"
              validateStatus={errors?.personalData?.phone ? 'error' : 'success'}
              help={errors?.personalData?.phone && errors.personalData.phone.message}
            >

              <Input.Root>

                <Input.Label
                  className="text-gray-neutral-400"
                  content="Telefone"
                  htmlFor="phone"
                />
                <PatternFormat

                  format="(##) #####-####"
                  allowEmptyFormatting
                  mask="_"
                  className="rounded-md py-2 px-1 border border-gray-neutral-200 hover:border-gray-neutral-400 focus:border-gray-neutral-400 focus:outline-none"
                  onChange={onChange}
                  value={phone}
                  disabled={isUser}


                />

              </Input.Root>

            </FormItem>

          )}
        />

      </Col>

      <Col lg={24}>

        <Controller
          control={control}
          rules={{ required: true }}
          name={'personalData.email'}
          defaultValue={email}
          render={({ field }) => (

            <FormItem
              name="personalData.email"
              validateStatus={errors.personalData?.email ? 'error' : 'success'}
              help={errors.personalData?.email && errors.personalData?.email.message}
              hasFeedback
            >

              <Input.Root>

                <Input.Label
                  className="text-gray-neutral-400"
                  content="E-mail"
                  htmlFor="email"
                />

                <Input.System
                  type="email"

                  id="email"

                  {...field}

                />

              </Input.Root>



            </FormItem>


          )}
        />

      </Col>

      <Col lg={24}>

        <Controller
          name="personalData.password"
          control={control}
          rules={{ required: true }}
          defaultValue={password}
          render={({ field }) => {
            return (

              <FormItem
                name="senha"
                validateStatus={errors.personalData?.password ? 'error' : 'success'}
                help={errors.personalData?.password && errors?.personalData.password.message}>

                <Form.InputWrapper >

                  <label>Senha</label>


                  <InputPassword

                    className="ant-input py-2"
                    {...field}
                  />



                </Form.InputWrapper>
              </FormItem>

            )
          }}
        />


      </Col>

    </Row>

  );

}

export default EditPersonalData