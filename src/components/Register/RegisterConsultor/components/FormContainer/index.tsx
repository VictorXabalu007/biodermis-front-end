
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import z from 'zod'
import { Button } from "../../../../shared/Button";
import { AddressDataForm } from "./components/AddressDataForm";
import { BankDataForm } from "./components/BankDataForm";
import { isPixKey } from "../../../../../functions/Validators/ValidatePixKey";
import { isPhoneNumber } from "../../../../../functions/Validators/ValidatePhoneNumber";
import { isCpf } from "../../../../../functions/Validators/ValidateCPF";
import { Uploader } from "./components/Uploader";
import { Checkboxes } from "./components/Checkboxes";
import { useEffect, useState } from "react";
import { UserRole } from "../../../../../util/UserRole";
import { Form  } from "antd";
import { PessoalDataForm } from "./components/PessoalDataForm";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../service/connection";
import { useMessageAction } from "../../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../../service/getHeaders";
import { getTypeOfPixKey } from "../../../../../functions/Getters/getTypeOfPixKey";


export const pessoalDataSchema = z.object({

    nome: z.string({required_error: 'O nome é obrigatório'})
    .min(1,'O nome não pode ser vazio')
    .transform(name => {
        return name.trim().split(' ').map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        }).join(' ')
    
      }),

    cpf: z.string({required_error: 'cpf é necessário para o cadastro'})
    .min(1, 'CPF é necessário para o cadastro')
    .refine(value => isCpf(value),{message: 'cpf inválido digitado'})
    ,
    email: z.string({required_error: 'email não pode ser vazio'})
    .min(1,'E-mail é necessário para o cadastro'),

    telefone: z.string({required_error: 'Número de telefone é necessário para o cadastro'})
    .min(1, 'Número de telefone é necessário para o cadastro')
    .refine(phone => isPhoneNumber(phone),{message: 'Número de telefone inválido'}),

    senha: z.string({required_error: 'Senha é necessária para o cadastro'})
    .min(8, 'A senha precisa no mínimo ter 8 caracteres...')
})

export const addressDataSchema = z.object({

    estado: z.string({required_error: 'Endereço não pode ser vazio'})
    .min(1,'Endereço é obrigatório para o cadastro'),

    cep: z.string({required_error: 'CEP é necessário para o cadastro'})
    .min(1,'CEP é obrigatório para o cadastro'),

    rua: z.string({required_error: 'Rua é necessário para o cadastro'})
    .min(1,'Rua é obrigatório para o cadastro'),

    bairro: z.string({required_error: 'Bairro é necessário para o cadastro'})
    .min(1,'Bairro é obrigatório para o cadastro'),

    cidade: z.string({required_error: 'Cidade é necessário para o cadastro'})
    .min(1,'Cidade é obrigatório para o cadastro'),

    numero: z.string().optional(),
    complemento: z.string({required_error:'Insira o complemento por favor!'})
    .min(1,'Por favor, insira o complemento!')


});



export const bankDataSchema = z.object({


    agencia: z.string({required_error: 'Número da Agencia é obrigatório para o cadastro'})
    .min(1,'Número da Agencia não pode ser vazio')
    .optional(),
    
    pix: z.string({required_error: 'Chave pix é obrigatória para o cadastro'})
    .min(1,'Chave píx não pode ser vazia')
    .refine(pixkey=> isPixKey(pixkey),{message: 'Chave pix inválida inserida'})
    .optional(),
    
    conta: z.string({required_error:'conta é obrigatório para cadastro'})
    .min(1,'conta é obrigatório para o cadastro')
    .optional(),

    banco: z.string({required_error: 'Banco é obrigatório para cadastro'})
    .optional()

})




export const userSchema = z.object({
    ...pessoalDataSchema.shape,
    ...addressDataSchema.shape,
    bankData: bankDataSchema,
    cargo_id: z.union([
      z.literal(UserRole.ADMIN),
      z.literal(UserRole.MANAGER),
      z.literal(UserRole.STOCK),
      z.literal(UserRole.CONSULTOR),
      z.literal(UserRole.USER),
    ]),
    certificado: z.array(z.custom().refine(file => file !== null, 'Insira pelo menos um certificado'),
    {required_error: 'Pelo menos um certificado deve ser cadastrado!'}).refine(arr => arr.length !== 0, 'Pelo menos um certificado é necessário!')
    .optional()
  }).refine(schema => {
    const { cargo_id, certificado } = schema;

    if (cargo_id === UserRole.CONSULTOR) {
      return certificado !== undefined;
    }
    return true;
    
  }, {
    message: 'Certificado é obrigatório para consultores',
    path: ['certificado'],
  });

export const viewUserSchema = z.object({
    ...pessoalDataSchema.shape,
    ...addressDataSchema.shape,
    ...bankDataSchema.shape
});


export type UserData = z.infer<typeof userSchema>


export const FormContainer = () => {


    const {success,error, contextHolder} = useMessageAction();

    const [isConsultor, setIsConsultor] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset, 
        control,
        watch} = useForm<UserData>({
        
        resolver: zodResolver(userSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            cargo_id: UserRole.ADMIN,
            certificado: undefined
        }

    });


    const userRole = watch('cargo_id');


    useEffect(()=> {

        if(userRole === UserRole.CONSULTOR){
            setIsConsultor(true)
        } else {
            setIsConsultor(false)
        }
        
    },[watch,isConsultor,userRole]);

    const [currentId, setCurrentId] = useState(0)
    
    
    const postAddress = useMutation({
        mutationFn: async (data:UserData) => {
            const body = {
                "rua": data.rua,
                "bairro": data.bairro,
                "estado":data.estado,
                "cep": data.cep,
                "cidade": data.cidade,
                "usuario_id":currentId,
                "numero":data.numero,
                "complemento":data.complemento
              
            }

            const headers = getHeaders();
          
            const req = await api.post(`/endereco`,body, {
                headers
            })

            return req.data

            
        },
        onSuccess: () => {
            success('Usuário registrado com sucesso!');
            onReset();
        },
        onError: (err)=> {
            console.log(err);
            
            error('Falha ao registrar usuário')
        }
    })
    const mutation = useMutation({

        mutationFn: async (data: UserData) => {

            const headers = getHeaders();

          

            const body = {

                "nome": data.nome,
                "cpf": data.cpf,
                "email": data.email,
                "telefone": data.telefone,
                "agencia": data.bankData.agencia,
                "conta": data.bankData.conta,
                "pix": data.bankData.pix,
                "senha": data.senha,
                "cargo_id": data.cargo_id,
                "banco":data.bankData.banco,
                "tipochave": getTypeOfPixKey(data.bankData.pix)
            }




            const req = await api.post('/usuarios',body,{
                headers,
            });
            
            return req.data;

          },

          onSuccess: (res,context) => {

        
            setCurrentId(res.id)
            postAddress.mutate(context)
            
        

          },

        onError: (err: any) => {
            
            error(err.response.data.error);

        }

    })

    const onSubmit = (data: UserData) => {

        mutation.mutate(data);

    }


    const [form] = Form.useForm();

    const onReset = () => {

        form.resetFields();
        reset({cargo_id: UserRole.ADMIN});
        
 
    };

    return (

        <div className="max-w-2xl">
            {contextHolder}

            <Form
                form={form}
                onFinish={handleSubmit(onSubmit)}
            >
                
                <PessoalDataForm 
                errors={errors}
                control={control}
                />

                <AddressDataForm 
                 errors={errors}
                 register={register}
                 control={control}

                />

        
                   <BankDataForm 
                   errors={errors}
                   register={register}
                   control={control}
                  />
     
             

          
                <Checkboxes
                errors={errors}
                register={register}
                control={control}
                />
                


                {isConsultor &&
                    <Uploader 
                    control={control}
                    errors={errors}
                    register={register}
                    />
                }    


                <div className="flex gap-2 mt-10">

                    <Button.Root htmlType="submit" aria-label="submit fields" className="w-1/3">

                        <Button.Wrapper>
                            <Button.Content 
                                content="Enviar"
                                />
                        </Button.Wrapper>

                    </Button.Root>

                    <Button.Root 
                    aria-label="reset fields"
                    className="w-1/3 bg-gray-neutral-200 hover:bg-gray-neutral-400 text-gray-neutral-950"
                    htmlType="reset"
                    onClick={onReset}
                    >
                        
                        <Button.Wrapper>

                            <Button.Content 
                                content="cancelar"
                                />

                        </Button.Wrapper>
                        
                    </Button.Root>

                </div>

            </Form>

            </div>


    );
}