import {  Modal } from "antd"
import { BsExclamationSquare } from "react-icons/bs"
import { FiPrinter } from "react-icons/fi"
import { RequestStatus } from "../Modal/RequestStatus";
import { IoMdClose } from "react-icons/io";
import { BRAND_PURPLE } from "../../../../../../constants/classnames/classnames";
import ReactPDF from '@react-pdf/renderer';
import { PDFFile } from "../../../../../../resources/PDFFile";
import { saveAs } from 'file-saver';
import { Requests } from "../../../@types/Requests";
import { useUserData } from "../../../../../../hooks/useUserData/useUserData";
import { getFormaPag } from "../../../../../../functions/Getters/getFormaPag";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../../../service/queryClient";


const { confirm } = Modal;


export const TableActions = ({requests}:{requests:Requests}) => {


    const {getUserById} = useUserData();




    const showRequestStats = () => {

        confirm({

            content:
          
                  <QueryClientProvider client={queryClient}>
                   <RequestStatus requests={requests} />
            </QueryClientProvider>
        
          ,
            closable: true,
            closeIcon: <IoMdClose style={{fill: BRAND_PURPLE}} />,
            okButtonProps: {className: 'hidden'}, 
            cancelButtonProps: {className: 'hidden'},
            width: '40%',
            maskClosable: true,
            
            

          });

    }

    const dowloadPdf = async () => {



        const name = `#${requests.id < 10 ? '0' + requests.id : requests.id}Pedido`;

        const data = {
            ...requests,
            user_data:getUserById(requests.cliente_id),
            formaPag: getFormaPag(requests.formapag_id)
        }

        console.log(data);
        

        const blob = await ReactPDF.pdf(<PDFFile data={data} />).toBlob();
        if(blob) {
            saveAs(blob, name);
        }

    }


    return (
        
      
            <div className="flex gap-2 text-xl justify-center items-center">

                <BsExclamationSquare onClick={showRequestStats} className="text-purple-solid-600 hover:text-purple-solid-600/50" />
                <FiPrinter onClick={dowloadPdf}  className="text-purple-solid-600 hover:text-purple-solid-600/50" />

            </div>


    )
}