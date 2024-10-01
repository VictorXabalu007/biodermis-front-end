

import {z} from 'zod'
import { isCpf } from '../functions/Validators/ValidateCPF';
import { isPhoneNumber } from '../functions/Validators/ValidatePhoneNumber';
import { UserRole } from '../util/userRole';
import { isPixKey } from '../functions/Validators/ValidatePixKey';

const pessoalDataSchema = z.object({

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

const addressDataSchema = z.object({

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



const bankDataSchema = z.object({

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




const userSchema = z.object({
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
    .transform((file) => (file ? file[0] : []))
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


export type UserData = z.infer<typeof userSchema>

export {
    userSchema,
    bankDataSchema,
    addressDataSchema,
    pessoalDataSchema
}

