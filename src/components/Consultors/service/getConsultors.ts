import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";

export const getConsultors = async (status: string) => {
  try {
    const headers = getHeaders();
    const param = status ? `?status=${status}` : "";
    const req = await api.get(`/consultores/0${param}`, {
      headers,
    });
    return req.data;
  } catch (e: any) {
    console.log("Erro ao pegar consultores: ", e);
  }
};
