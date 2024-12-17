import { api } from "../../../service/connection";
import { getHeaders } from "../../../service/getHeaders";

export const getWithdraw = async () => {
  const headers = getHeaders();

  const req = await api.get("/saques/0", {
    headers,
  });

  return req.data;
};
