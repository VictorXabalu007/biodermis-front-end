import { UserStatus } from "../UserStatus/StatusType";


export interface UserCredentials {
  agencia: string;
  bairro: string;
  cargo_id: number;
  cep: string;
  cidade: string;
  conta: string;
  cpf: string;
  email: string;
  estado: string;
  id: number;
  nome: string;
  pix: string;
  rua: string;
  numero: string,
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
}

export type UserData = {

  usuario: UserCredentials
  token: string


}