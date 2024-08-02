import { Button, Card, Image, Popconfirm, Tooltip } from "antd"
import { CardProps } from "flowbite-react"
import {  useState } from "react";
import { FaEye, FaStar, FaTag, FaTrash } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { BannerTitle } from "../../../Banners/@types/BannerType";
import { LuCrown } from "react-icons/lu";
import { IconBaseProps } from "react-icons/lib";
import { BannersComponents } from "../../../Banners/components";
import { API_URL } from "../../../../service/url";
import { api } from "../../../../service/connection";
import { useMessageAction } from "../../../../hooks/useMessageAction/useMessageAction";
import { getHeaders } from "../../../../service/getHeaders";


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
        size: 20, className: "mt-5 text-brand-purple" 
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

    console.log(API_URL+"/"+imagem);
    
    return (


            <Card 
              
                cover={
                    <Image
                    alt="example"
                    src={API_URL+"/"+imagem}
                    preview={!previewVisible ? false : { visible: previewVisible, onVisibleChange: setPreviewVisible }}
                    style={{

                        minHeight:'250px',
                        maxHeight:'250px',
                        objectFit:'cover'
                    }}
                    
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
                avatar={<Tooltip title={`Este banner pertence a categoria: ${getCategory()}`}>{getIcon()}</Tooltip>}
                title={titulo}


                
            />
                {children}
                <BannersComponents.Edit 
                    setOpen={setOpenEdit}
                    open={openEdit}
                    imagem={imagem}
                    ordem={order}
                    id={id}
                 />
            </Card>


 
    )
}