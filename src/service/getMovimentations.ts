import { api } from "./connection";
import { getHeaders } from "./getHeaders";

export const getMovimentations = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const headers = getHeaders();
  const url = `/movimentacoes?startDate=${startDate}&endDate=${endDate}`;
  try {
    const req = await api.get(url, {
      headers,
    });

    return req.data;
  } catch (e: any) {
    console.log("Erro ao pegar movimentações: ", e);
  }
};
