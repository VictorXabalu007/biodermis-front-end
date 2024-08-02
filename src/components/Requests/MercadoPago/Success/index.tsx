import { Button, Result } from "antd";
import { useURLParams } from "../../../../hooks/useURLParams/useURLParams";
import { useEffect, useState } from "react";
import { api } from "../../../../service/connection";
import { getHeaders } from "../../../../service/getHeaders";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginType } from "../../../Auth/Login";
import { AUTH_USER } from "../../../../constants/SessionStorageKeys/sessionStorageKeys";


type PaymentType = {
  payment_id: any;
  status: any;
  payment_type: any;
  preference_id: any;
};

const USER_EMAIL = 'adminbiodermis@biodermis.com'
const USER_PASS = 'admin123'

export const MercardoPagoSuccess = () => {

  const query = useURLParams();

  const status = query.get("status") || null;

  const [payment_data, setPaymentData] = useState<PaymentType>(
    {} as PaymentType
  );

  const logUser = useMutation({
    mutationFn: async (data: LoginType) => {
      const body = {
        email: data.email,
        senha: data.password
      };
      const request = await api.post('/login', body);
      return request.data;
    },
    onSuccess: (res) => {
      sessionStorage.setItem(AUTH_USER, JSON.stringify(res));
      sessionStorage.setItem('token', JSON.stringify(res.token))
  
    },

  });

  useEffect(()=> {
    logUser.mutate({
      email: USER_EMAIL,
      password: USER_PASS
    })
  },[])

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

        return req.data;
      }
    },
  });

  const getFormaPagId = () => {

    switch(payment_data.payment_type) {
      case 'credit_card':
        return 2
      case 'pix':
        return 1
      case 'debit_card':
        return 3
      case 'ticket':
        return 4

    }
  }

  const updateRequest = useMutation({
    mutationFn: async () => {

      const headers = getHeaders();

      const body = {
        statuspag: 'realizado',
        formapag_id: getFormaPagId()

      }
      const req = await api.patch(`/pedidos/${data.id}`,body,{
        headers
      })
      
      return req.data
    },
    onSuccess:()=> {

      
    },
    onError:() => {

   
      
    }
  })

  useEffect(() => {


    updateRequest.mutate()

  }, [data,]);


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
