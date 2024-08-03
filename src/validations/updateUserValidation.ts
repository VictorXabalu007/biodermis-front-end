import { z } from "zod";
import { isCpf } from "../functions/Validators/ValidateCPF";
import { isPhoneNumber } from "../functions/Validators/ValidatePhoneNumber";
import { isPixKey } from "../functions/Validators/ValidatePixKey";




const editUserPersonalDataSchema = z.object({
    name: z.string({required_error:'O nome não pode ficar vazio!'})
    .min(1, 'O nome não pode ser vazio'),
    cpf: z.string({required_error:'O CPF não pode ficar vazio!'})
    .min(1, 'O CPF não pode ser vazio').refine(val => isCpf(val),'CPF inválido!'),
    phone:  z.string({required_error:'O Telefone não pode ficar vazio!'})
    .min(1, 'O Telefone não pode ser vazio').refine(val => isPhoneNumber(val),'Número inválido!'),
    email:  z.string({required_error:'O E-mail não pode ficar vazio!'})
    .min(1, 'O E-mail não pode ser vazio').email('Isso não é um e-mail!'),
    password:z.string({required_error:'A senha não pode ficar vazia!'})
    .min(1, 'A senha não pode ser vazia')
});

const editUserAddressDataSchema = z.object({
    state: z.string({required_error:'O estado não pode ser vazio!'})
    .min(1, 'O estado não pode ser vazio!'),
    cep: z.string({required_error:'O CEP não pode ficar vazio!'})
    .min(1,'O CEP não pode ser vazio!'),
    number: z.string().optional().nullable(),
    street: z.string({required_error:'A rua não pode ser vazia!'})
    .min(1,'A rua não pode ser vazia!'),
    neighboorhood: z.string({required_error:'O bairro não pode ser vazio!'})
    .min(1,'Por favor, insira o bairro!'),
    city: z.string({required_error:'A cidade não pode ser vazia!'})
    .min(1,'Por favor, insira a cidade!'),
    complement: z.string({required_error:'Insira o complemento por favor!'})
    .min(1,'Por favor, insira o complemento!')
})

const editUserBankDataSchema = z.object({
    agency: z.string().optional(),
    pixkey: z.string().optional().refine(val => val && isPixKey(val),'Chave pix inválida inserida!'),
    account: z.string().optional(),
    bank: z.string().optional()
})

const editConsultorBankDataSchema = z.object({
    agency: z.string({required_error:'Por favor, insira agencia!'})
    .min(1,'A agência não pode ser vazia!'),
    pixkey: z.string({required_error:'A chave pix não pode ser vazia!'})
    .min(1,'A chave pix não pode ser vazia!').refine(val => isPixKey(val),'Chave pix inválida inserida!'),
    account: z.string({required_error:'O número da conta não pode ficar vazio!'})
    .min(1,'Por favor, insira o número da conta!'),
    bank: z.string({required_error:'O banco não pode ficar vazio!'})
    .min(1,'Por favor, insira o banco!')
})

type PersonalEditType = z.infer<typeof editUserPersonalDataSchema>
type AddressEditType = z.infer<typeof editUserAddressDataSchema>
type BankEditType = z.infer<typeof editUserBankDataSchema>
export type ConsultorBankEditType = z.infer<typeof editConsultorBankDataSchema>

export enum UserEditSteps  {
    PersonalData = 'personalData',
    AddressData = 'addressData',
    BankData = 'bankData'
}

export enum UserEditRole  {
    NormalUser = 'normalUser',
    Consultor = 'consultor',
    UserClient = 'client'
}

const userEditSchema = z.discriminatedUnion('formType',[
    z.object({
        formType: z.literal(UserEditSteps.PersonalData),
        personalData: editUserPersonalDataSchema
    }),
    z.object({
        formType: z.literal(UserEditSteps.AddressData),
        addressData: editUserAddressDataSchema
    }),
    z.object({
        formType: z.literal(UserEditSteps.BankData),
        bankData: editUserBankDataSchema
    }),
])

export type UserEditType = {
    formType: UserEditSteps,
    personalData: PersonalEditType,
    addressData:AddressEditType,
    bankData:BankEditType
    userType: UserEditRole
}


export {
    editUserPersonalDataSchema,
    editUserBankDataSchema,
    editUserAddressDataSchema,
    userEditSchema
}
