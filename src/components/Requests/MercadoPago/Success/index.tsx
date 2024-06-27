import { Button, Result } from "antd";
import { useURLParams } from "../../../../hooks/useURLParams/useURLParams";
import { useEffect, useState } from "react";
import { api } from "../../../../service/connection";
import { getHeaders } from "../../../../service/getHeaders";
import { useQuery } from "@tanstack/react-query";


type PaymentType = {
  payment_id: any;
  status: any;
  payment_type: any;
  preference_id: any;
};

export const MercardoPagoSuccess = () => {
  const query = useURLParams();

  const status = query.get("status") || null;

  const [payment_data, setPaymentData] = useState<PaymentType>(
    {} as PaymentType
  );

  useEffect(() => {
    if (status && status === "approved") {
      setPaymentData({
        payment_id: query.get("payment_id"),
        status: status,
        payment_type: query.get("payment_type"),
        preference_id: query.get("preference_id"),
      });
    }
  }, [status]);

  const { data } = useQuery({
    queryKey: ["product_update"],
    queryFn: async () => {

      if (payment_data) {
        const headers = getHeaders();

        const req = await api.get(
          `/pedidos/preferences/${query.get('preference_id')}`,
          {
            headers,
          }
        );
        console.log(req.data);

        return req.data;
      }
    },
  });

  useEffect(() => {

        console.log(data);
        
  }, [data]);


  console.log(payment_data);

  return (
    <Result
    status="success"
    title="Compra realizada com sucesso!"
    subTitle={`Número do pedido: ${query.get("payment_id")}`}
    extra={[
      <Button key="console">
        Ok
      </Button>,
    ]}
  />
  );
};
