
import { FormProvider, useForm } from "react-hook-form";
import { UserEditRole, userEditSchema, UserEditSteps, UserEditType } from "../../../validations/updateUserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormType } from "../../../@types/FormType/FormType";
import { Stepper } from "./Stepper";
import { Alert, Form } from "antd";
import { UserRole } from "../../../util/userRole";
import { UserCredentials } from "../../../@types/UserData/UserData";
import EditPersonalData from "./EditPersonalData";
import EditAddressData from "./EditAddressData";
import EditBankData from "./EditBankData";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../../service/getHeaders";
import { api } from "../../../service/connection";
import { getTypeOfPixKey } from "../../../functions/Getters/getTypeOfPixKey";
import { useMessageAction } from "../../../hooks/useMessageAction/useMessageAction";

export const UserForm = ({isReadonly, row, table, data}:FormType<UserCredentials>) => {

    const {contextHolder,success,error} = useMessageAction()
    
    const formMethods = useForm<UserEditType>({

        defaultValues: {
            formType:UserEditSteps.PersonalData,
            personalData:{
                name:data.nome,
                cpf:data.cpf,
                email:data.email,
                phone:data.telefone,
                password:data.senha
            },
            addressData:{
                cep:data.cep,
                city:data.cidade,
                neighboorhood:data.bairro,
                number:data.numero,
                state:data.estado,
                street:data.rua,
                complement:data.complemento,
            },
            bankData:{
                account:data.conta,
                agency:data.agencia,
                bank:data.banco,
                pixkey:data.pix
            },
            userType: row.original.cargo_id === UserRole.CONSULTOR ? UserEditRole.Consultor : 
            row.original.cargo_id === UserRole.USER ? UserEditRole.UserClient : UserEditRole.NormalUser
        },
        resolver: zodResolver(userEditSchema),
        mode: 'all',
        criteriaMode: 'all'
    });

    const {setValue,watch,handleSubmit} = formMethods;

    const formType = watch('formType')
    const isPersonalData = formType === 'personalData'
    const isAddressData = formType === 'addressData'
    const isBankData = formType === 'bankData'

    const setFormType = (formType:UserEditSteps) => {

        setValue('formType',formType);

    }


    const updateUserData = useMutation({
        mutationFn: async (data:UserEditType) => {

            const headers = getHeaders();

            const body = {
                "nome": data.personalData.name,
                "cpf": data.personalData.cpf,
                "telefone": data.personalData.phone,
                "agencia": row.original.agencia,
                "conta": row.original.conta,
                "pix": row.original.pix,
                "tipochave": getTypeOfPixKey(row.original.pix),
                "banco":row.original.banco,
                "email":data.personalData.email
            }

            const req = await api.patch(`/usuarios/${row.original.id}`,body,{
                headers
            });

            return req.data

        },
        onSuccess: (res, data:UserEditType) => {
            
            success(res.success)

            const body = {
                "nome": data.personalData.name,
                "cpf": data.personalData.cpf,
                "telefone": data.personalData.phone,
                "agencia": row.original.agencia,
                "conta": row.original.conta,
                "pix": row.original.pix,
                "banco":row.original.banco,
                "email":data.personalData.email
            }
   
            //@ts-ignore
            table.options.meta?.updateData(row.index, body);
            

        },

        onError: (err:any) => {
             
            error(err.response.data.error)
        }
    })
    
    const updateUserAddress = useMutation({
        mutationFn: async (data:UserEditType) => {

            const headers = getHeaders();

            const hasAddress = (row.original.estado &&
            row.original.cidade && row.original.cep && row.original.cidade &&
            row.original.numero) !== undefined
            

            if(hasAddress) {
                
                const body = {
                    "rua": data.addressData.street,
                    "bairro": data.addressData.neighboorhood,
                    "complemento": data.addressData.complement,
                    "numero": data.addressData.number,
                    "cep": data.addressData.cep,
                    "cidade":  data.addressData.city,
                    "estado": data.addressData.state,
        
                }
    
                const req = await api.patch(`/endereco/${row.original.addressId}`,body,{
                    headers
                });
    
                return req.data

            } else {

                const body = {
                    "rua": data.addressData.street,
                    "bairro": data.addressData.neighboorhood,
                    "complemento": data.addressData.complement,
                    "numero": data.addressData.number,
                    "cep": data.addressData.cep,
                    "cidade":  data.addressData.city,
                    "estado": data.addressData.state,
                    "usuario_id":row.original.id
        
                }
    
                const req = await api.post(`/endereco`,body,{
                    headers
                });
    
                return req.data
            }

        },
        onSuccess: (res, context:UserEditType) => {
            
            success(res.success)
      
   
            //@ts-ignore
            table.options.meta?.updateData(row.index, context);
            

        },

        onError: (err:any) => {

            error(err.response.data.error)
            
        }
    })

    const updateUserBank = useMutation({
        mutationFn: async (data:UserEditType) => {

            const headers = getHeaders();

            const body = {
                "nome": row.original.nome,
                "cpf":row.original.cpf,
                "telefone":row.original.telefone,
                "agencia": data.bankData.agency,
                "conta": data.bankData.account,
                "pix": data.bankData.pixkey,
                "tipochave": getTypeOfPixKey(data.bankData.pixkey),
                "banco":data.bankData.bank, 
                "email":row.original.email
            }

            const req = await api.patch(`/usuarios/${row.original.id}`,body,{
                headers
            });

            return req.data

        },
        onSuccess: (res, data:UserEditType) => {
            
            success(res.success)
            const body = {
                "nome": row.original.nome,
                "cpf":row.original.cpf,
                "telefone":row.original.telefone,
                "agencia": data.bankData.agency,
                "conta": data.bankData.account,
                "pix": data.bankData.pixkey,
                "tipochave": getTypeOfPixKey(data.bankData.pixkey),
                "banco":data.bankData.bank,
                "email":row.original.email
                
            }
   
            //@ts-ignore
            table.options.meta?.updateData(row.index, body);
            

        },

        onError: (err:any) => {
  
            error(err.response.data.error)
        }
    })

    const onSubmit = (data:UserEditType) => {

        
        switch(formType){
       
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
           disabled={row.original.cargo_id === UserRole.USER}

           >

                {contextHolder}
         
                {row.original.cargo_id === UserRole.USER &&

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

                    <Button.Root htmlType="submit" className="mt-4 w-full">
                        <Button.Wrapper>
                            <Button.Content content="Confirmar" />
                        </Button.Wrapper>
                    </Button.Root>

                }


                </Form>

            </FormProvider>





    );

}