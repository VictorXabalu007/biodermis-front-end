import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateOrderSchema,
  UpdateRequestType,
} from "../../validations/updateRequestValidation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getHeaders } from "../../service/getHeaders";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";

type Props = {
  request: Requests
}
export const useRequestUpdate = ({
  request
}:Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateRequestType>({
    resolver: zodResolver(updateOrderSchema),
    criteriaMode: "all",
    mode: "all",
  });

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
        dataenvio: sendData.sendDate,
        codigorastreio: sendData.sendCode,
      };

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
