import { UserStatus } from "../UserStatus/StatusType";


export type UserAddress = {
  cep: string;
  cidade: string;
  estado: string;
  rua: string;
  numero: string,
  bairro: string;
  usuario_id: number
  id:number
}

export type UserCredentials = {
  agencia: string;
  banco:string,
  cargo_id: number;
  complemento:string
  conta: string;
  cpf: string;
  email: string;

  id: number;
  nome: string;
  pix: string;
  addressId:number,
  senharesettempo: string | null;
  senharesettoken: string | null;
  srccert: string | null;
  srcperfil: string | null;
  status: UserStatus;
  telefone: string;
  totalfat: string;
  valordispsaque: string;
  senha:string,
  rank: string
  cep: string;
  cidade: string;
  estado: string;
  rua: string;
  numero: string,
  bairro: string;
}

export type UserData = {

  usuario: UserCredentials
  token: string


}
