import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  updateOrderSchema,
  UpdateRequestType,
} from "../../validations/updateRequestValidation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";
import { useEffect } from "react";

type Props = {
  request: Requests
}
export const useRequestUpdate = ({
  request
}: Props) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateRequestType>({
    resolver: zodResolver(updateOrderSchema),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      sendDate: new Date(request.dataenvio ?? new Date()).toLocaleDateString(),
      sendCode: request.codigorastreio ?? "",
    }
  });
  useEffect(() => {
    if (request.codigorastreio) {
      setValue("sendCode", request.codigorastreio);
    }
    if (request.dataenvio) {
      console.log(dayjs(request.dataenvio, 'DD/MM/YYYY'), request.dataenvio);
      setValue("sendDate", dayjs(request.dataenvio, 'DD/MM/YYYY').format('MM/DD/YYYY'));
    } else {
      setValue("sendDate", dayjs().format('MM/DD/YYYY'));
    }
  }, [request])
  const {
    success,
    error,
    contextHolder,
  } = useMessageAction();


  const updateRequest = useMutation({
    mutationFn: async (sendData: UpdateRequestType) => {
      const headers = getHeaders();
      const body = {
        statusentrega: "realizada",
        formaenvio: request.formaenvio,
        dataenvio: dayjs(sendData.sendDate).format('DD/MM/YYYY'),
        codigorastreio: sendData.sendCode,
      };
      console.log({ body })

      const req = await api.patch(`/pedidos/${request.id}`, body, {
        headers,
      });

      return req.data;
    },
    onSuccess: (res) => {
      success(res.success);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (err: any) => {
      console.log('Erro ao atualizar pedido: ', err);

      error(err.response.data.error);
    },
  });

  const onSubmit = (data: UpdateRequestType) => {
    updateRequest.mutate(data);
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    contextHolder,
  };
};
