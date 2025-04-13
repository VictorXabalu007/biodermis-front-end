import { FormProvider, useForm } from "react-hook-form";
import { UserEditRole, userEditSchema, UserEditSteps, UserEditType } from "../../../validations/updateUserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper } from "./Stepper";
import { Alert, Button, Form } from "antd";
import { UserRole } from "../../../util/userRole";
import EditPersonalData from "./EditPersonalData";
import EditAddressData from "./EditAddressData";
import EditBankData from "./EditBankData";
import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../service/getHeaders";
import { api } from "../../../service/connection";
import { getTypeOfPixKey } from "../../../functions/Getters/getTypeOfPixKey";
import { useMessageAction } from "../../../hooks/useMessageAction";
import { useEffect } from "react";

export const UserForm = ({ isReadonly, data }: FormType<UserCredentials>) => {

    const { contextHolder, success, error } = useMessageAction()
    const formMethods = useForm<UserEditType>({
        defaultValues: {
            formType: UserEditSteps.PersonalData,
            personalData: {
                name: data.nome,
                cpf: data.cpf,
                email: data.email,
                phone: data.telefone,
                password: ""
            },
            addressData: {
                cep: data.cep,
                city: data.cidade,
                neighboorhood: data.bairro,
                number: data.numero,
                state: data.estado,
                street: data.rua,
                complement: data.complemento,
            },
            bankData: {
                account: data.conta,
                agency: data.agencia,
                bank: data.banco,
                pixkey: data.pix
            },
            userType: data.cargo_id === UserRole.CONSULTOR ? UserEditRole.Consultor :
                data.cargo_id === UserRole.USER ? UserEditRole.UserClient : UserEditRole.NormalUser
        },
        resolver: zodResolver(userEditSchema),
        mode: 'all',
        criteriaMode: 'all'
    });

    const { reset, setValue, watch, handleSubmit } = formMethods;

    useEffect(() => {
        reset({
            formType: UserEditSteps.PersonalData,
            personalData: {
                name: data.nome,
                cpf: data.cpf,
                email: data.email,
                phone: data.telefone,
                password: ""
            },
            addressData: {
                cep: data.cep,
                city: data.cidade,
                neighboorhood: data.bairro,
                number: data.numero,
                state: data.estado,
                street: data.rua,
                complement: data.complemento,
            },
            bankData: {
                account: data.conta,
                agency: data.agencia,
                bank: data.banco,
                pixkey: data.pix
            },
            userType: data.cargo_id === UserRole.CONSULTOR ? UserEditRole.Consultor :
                data.cargo_id === UserRole.USER ? UserEditRole.UserClient : UserEditRole.NormalUser
        });
    }, [data, reset]);

    const formType = watch('formType')
    const isPersonalData = formType === 'personalData'
    const isAddressData = formType === 'addressData'
    const isBankData = formType === 'bankData'

    const setFormType = (formType: UserEditSteps) => {

        setValue('formType', formType);

    }


    const updateUserData = useMutation({
        mutationFn: async (userData: UserEditType) => {

            const headers = getHeaders();

            const body = {
                "nome": userData.personalData.name,
                "cpf": userData.personalData.cpf,
                "telefone": userData.personalData.phone,
                "agencia": data.agencia,
                "conta": data.conta,
                "pix": data.pix,
                "tipochave": getTypeOfPixKey(data.pix),
                "banco": data.banco,
                "email": data.email,
                "senha": userData.personalData.password,
            }

            const req = await api.patch(`/usuarios/${data.id}`, body, {
                headers
            });

            return req.data

        },
        onSuccess: (res) => {

            success(res.success)

            setTimeout(() => {
                window.location.reload();
            }, 1000)


        },

        onError: (err: any) => {

            error(err.response.data.error)
        }
    })

    const updateUserAddress = useMutation({
        mutationFn: async (userData: UserEditType) => {

            const headers = getHeaders();

            const hasAddress = (data.estado &&
                data.cidade && data.cep && data.cidade &&
                data.numero) !== undefined


            if (hasAddress) {

                const body = {
                    "rua": userData.addressData.street,
                    "bairro": userData.addressData.neighboorhood,
                    "complemento": userData.addressData.complement,
                    "numero": userData.addressData.number,
                    "cep": userData.addressData.cep,
                    "cidade": userData.addressData.city,
                    "estado": userData.addressData.state,

                }

                const req = await api.patch(`/endereco/${data.addressId}`, body, {
                    headers
                });

                return req.data

            } else {

                const body = {
                    "rua": userData.addressData.street,
                    "bairro": userData.addressData.neighboorhood,
                    "complemento": userData.addressData.complement,
                    "numero": userData.addressData.number,
                    "cep": userData.addressData.cep,
                    "cidade": userData.addressData.city,
                    "estado": userData.addressData.state,
                    "usuario_id": data.id,
                    "nomecliente": data.nome,
                    "telefone": data.telefone,
                }

                const req = await api.post(`/endereco`, body, {
                    headers
                });

                return req.data
            }

        },
        onSuccess: (res) => {

            success(res.success)


            setTimeout(() => {
                window.location.reload();
            }, 1000)


        },

        onError: (err: any) => {

            error(err.response.data.error)

        }
    })

    const updateUserBank = useMutation({
        mutationFn: async (userData: UserEditType) => {

            const headers = getHeaders();

            const body = {
                "nome": data.nome,
                "cpf": data.cpf,
                "telefone": data.telefone,
                "agencia": userData.bankData.agency,
                "conta": userData.bankData.account,
                "pix": userData.bankData.pixkey,
                "tipochave": getTypeOfPixKey(userData.bankData.pixkey),
                "banco": userData.bankData.bank,
                "email": data.email
            }

            const req = await api.patch(`/usuarios/${data.id}`, body, {
                headers
            });

            return req.data

        },
        onSuccess: (res) => {

            success(res.success)
            setTimeout(() => {
                window.location.reload();
            }, 1000)



        },

        onError: (err: any) => {

            error(err.response.data.error)
        }
    })

    const onSubmit = (data: UserEditType) => {


        switch (formType) {

            case UserEditSteps.PersonalData:
                updateUserData.mutate(data)
                break;
            case UserEditSteps.AddressData:
                updateUserAddress.mutate(data)
                break;
            case UserEditSteps.BankData:
                updateUserBank.mutate(data)
        }

    }

    return (

        <FormProvider
            {...formMethods}
        >


            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit)}
                disabled={data.cargo_id === UserRole.USER && !isAddressData}

            >

                {contextHolder}

                {data.cargo_id === UserRole.USER &&

                    <Alert
                        className="my-3"
                        type="warning"
                        message="Não é possível editar dados de um cliente"
                    />

                }


                <div className="flex flex-col w-full">

                    <Stepper
                        setFormType={setFormType}
                    />

                    {isPersonalData && <EditPersonalData />}
                    {isAddressData && <EditAddressData />}
                    {isBankData && <EditBankData />}

                </div>

                {!isReadonly &&


                    <Button htmlType={"submit"}>

                        Confirmar
                    </Button>

                }


            </Form>

        </FormProvider>





    );

}