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
import { useEffect, useState } from "react";
import { ProductsType } from "../../../../../Products/service/getProducts";
import { useProductsData } from "../../../../../Products/hooks/useProductsData";
import { useUserData } from "../../../../../../hooks/useUserData/useUserData";
import { getFormaPag } from "../../../../../../functions/Getters/getFormaPag";


const { confirm } = Modal;


export const TableActions = ({requests}:{requests:Requests}) => {

    const [products, setProducts] = useState<ProductsType[]>([]);

    const {getProductsById} = useProductsData();
    const {getUserById} = useUserData();

    useEffect(() => {

        const fetchedProducts = getProductsById(requests.produtos_ids);

        setProducts(fetchedProducts);
        
      }, [requests.produtos_ids, getProductsById]);

    

    const showRequestStats = () => {

        confirm({

            content: <RequestStatus requests={requests} />,
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
            products: products,
            user_data:getUserById(requests.cliente_id),
            formaPag: getFormaPag(requests.formapag_id)
        }

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