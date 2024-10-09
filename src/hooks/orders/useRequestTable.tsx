

import { useEffect, useState } from "react";
import { useMutation} from "@tanstack/react-query";


import { Modal } from "antd";
import { api } from "../../service/connection";
import { useMessageAction } from "../useMessageAction";
import { useRequestsData } from "./useRequestsData";
import { getHeaders } from "../../service/getHeaders";
import ReactPDF from "@react-pdf/renderer";
import { PDFFile } from "../../resources/PDFFile";
import { saveAs } from "file-saver";
import { useUserData } from "../useUserData";
import { getFormaPag } from "../../functions/Getters/getFormaPag";
import { useConsultorData } from "../users/useConsultorData";

export const useRequestTable = () => {

    const {consultor} = useConsultorData();
    const {data,setData, isLoading} = useRequestsData();

    const {
      contextHolder, 
      success, 
      error} = useMessageAction()


    const [requestsData, setRequestsData] = useState<Requests[]>([]);

    useEffect(()=> {

      if(data) {
        setRequestsData(data.map(d => ({
          ...d,
          nome_consultor:consultor.find(c => c.id === d.consultor_id)?.nome || 'Sem Consultor',
        })))
        
      }

    },[data,consultor])


    const deleteOrder = useMutation({
        mutationFn: async (id:number)=> {

          const headers = getHeaders();
          
            const req = await api.delete(`/pedidos/${id}`, {
              headers
            });
        
          return req.data
        },
          onSuccess: (res, context) => {

          success(res.success || `Pedido ${context} deletado com sucesso`);
          Modal.destroyAll();

          setData((prev) =>
            prev.filter((data) => data.id !== context)
          );

        },
      onError: (err: any) => {
        
   
        error(err.response.data.error);
        Modal.destroyAll();

      },
      
      });

      const {getUserById} = useUserData();

      const dowloadPdf = async (record: Requests) => {
        const name = `#${
          record.id < 10 ? "0" + record.id : record.id
        }Pedido`;
    
        const data = {
          ...record,
          user_data: getUserById(record.cliente_id),
          formaPag: getFormaPag(record.formapag_id),
        };
    
        const blob = await ReactPDF.pdf(<PDFFile data={data} />).toBlob();
        if (blob) {
          saveAs(blob, name);
        }
      };



    return {

        data: requestsData,
        deleteOrder,
        contextHolder,
        isLoading,
        setData,
        dowloadPdf
    };


}