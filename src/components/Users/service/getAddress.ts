import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";

export const getAddress = async () => {
  try {
    const headers = getHeaders();
    const req = await api.get(`/endereco/0`, {
      headers,
    });
    return req.data;
  } catch (e: any) {
    console.log("Erro ao pegar endereço do usuário: ", e);
  }
};
