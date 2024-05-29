

export type UserData = {


  usuario: {

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
      senharesettempo: string | null;
      senharesettoken: string | null;
      srccert: string | null;
      srcperfil: string | null;
      status: "ativo" | "inativo";
      telefone: string;
      totalfat: string;
      valordispsaque: string;

  },
  token: string


}