import { Button, Card, CardProps, Flex, Image, Popconfirm, Tooltip, Typography } from "antd"
import {  useState } from "react";
import { FaEye, FaStar, FaTag, FaTrash } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { BannerTitle } from "../../../Banners/@types/BannerType";
import { LuCrown } from "react-icons/lu";
import { IconBaseProps } from "react-icons/lib";

import { API_URL } from "../../../../service/url";
import { api } from "../../../../service/connection";
import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../service/getHeaders";
import { isValidURL } from "../../../../functions/Validators/isLink";
import BannerEditModal from "../../../Banners/banner-edit-modal";


type CardBannerRootProps = {
    imagem:string
    titulo:BannerTitle
    order:string
    id:number
}

const { Meta } = Card;

export const BannerCardRoot = ({imagem,titulo,order,id, children,...rest}:CardProps & CardBannerRootProps) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [openEdit,setOpenEdit] = useState(false)

    const {success,error,contextHolder} = useMessageAction();
    
    
    const openPreview = () => {
        setPreviewVisible(!previewVisible);
    };

    const iconProps:IconBaseProps = {
        size: 20, className: "text-brand-purple" 
    }



    const getIcon = () => {
        switch(titulo){
            case 'Principal':
                return <LuCrown {...iconProps} />
            case 'Mais Vendidos':
                return <FaStar {...iconProps} />
            case 'Promoção':
                return <FaTag  {...iconProps} />
        }
    }

    const getCategory = () => {
        switch(titulo){
            case 'Principal':
                return 'Principal'
            case 'Mais Vendidos':
                return 'Mais vendido'
            case 'Promoção':
                return 'Promoção'
        }
    }

    const handleEdit = () => {
        setOpenEdit(true)
    }

  

    const deleteBanner = async  () => {
        const headers = getHeaders();
        const req = await api.delete(`/carrossel/${id}/${order}`,{
            headers
        })

        if(req.status === 200) {
            success('Banner removido com sucesso!')
            setTimeout(()=> (
                window.location.reload()
            ),1000)
        } else {
            error(req.data.response.error)
        }
        
    }

    const isLink = isValidURL(imagem)
    
    return (


            <Card 
              
                cover={
                    <Image
                    alt="example"
                    src={isLink ? imagem : API_URL+"/"+imagem}
                    preview={!previewVisible ? false : { visible: previewVisible, onVisibleChange: setPreviewVisible }}
                    style={{

                        minHeight:'250px',
                        maxHeight:'250px',
                        objectFit:'cover'
                    }}
                    fallback="https://via.placeholder.com/150"
                    
                    />
                }
                actions={[
                    <Button key={"edit"} type="text">
                        <MdOutlineEdit onClick={handleEdit} className="mx-auto" size={20} style={{fill:'darkgrey'}}  />
                    </Button>,
                    <Button key={"preview"} type="text">
                        <FaEye onClick={openPreview}  className="mx-auto" size={20} style={{fill:'darkgrey'}}  />
                    </Button>,
                    <Popconfirm
                        key={"delete"} 
                        title="Deletar banner?"
                        okText="Sim"
                        cancelText="Não"
                        onConfirm={deleteBanner}
                        icon={false}
                      
                    >
                        <Button type="text">

                            <FaTrash 
                            className="mx-auto"
                            size={15}
                            style={{fill:'darkgrey'}} 
                             />

                        </Button>
                    </Popconfirm>
                
                ]}

                {...rest}
            >

                {contextHolder}

            <Meta

                title={<Flex gap={5} align="center">
                    
                    <Tooltip title={`Este banner pertence a categoria: ${getCategory()}`}>{getIcon()}</Tooltip>
                    
                    <Typography.Title style={{margin:0}} level={5}>
                        {titulo}
                    </Typography.Title>
                </Flex>}

            />

                {children}

                <BannerEditModal
                    setOpen={setOpenEdit}
                    open={openEdit}
                    imagem={imagem}
                    ordem={order}
                    id={id}
                 />
                 
            </Card>


 
    )
}