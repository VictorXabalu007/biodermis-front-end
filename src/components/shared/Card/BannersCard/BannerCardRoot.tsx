import { Card, Image, Tooltip } from "antd"
import { CardProps } from "flowbite-react"
import {  useState } from "react";
import { FaEye, FaStar, FaTag, FaTrash } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { BannerCategory, BannerStatusType } from "../../../Banners/@types/BannerType";
import { LuCrown } from "react-icons/lu";
import { IconBaseProps } from "react-icons/lib";
import { Tag } from "../../Tag";
import { BannersComponents } from "../../../Banners/components";


type CardBannerRootProps = {
    bannerSrc: string
    bannerName:string
    category: BannerCategory
    bannerStatus:BannerStatusType

}

const { Meta } = Card;

export const BannerCardRoot = ({bannerSrc,bannerName,category,bannerStatus, children,...rest}:CardProps & CardBannerRootProps) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [openEdit,setOpenEdit] = useState(false)


    const openPreview = () => {
        setPreviewVisible(!previewVisible);
    };

    const iconProps:IconBaseProps = {
        size: 20, className: "mt-5 text-brand-purple" 
    }



    const getIcon = () => {
        switch(category){
            case 'principal':
                return <LuCrown {...iconProps} />
            case 'maisVendido':
                return <FaStar {...iconProps} />
            case 'promocao':
                return <FaTag  {...iconProps} />
        }
    }

    const getCategory = () => {
        switch(category){
            case 'principal':
                return 'Principal'
            case 'maisVendido':
                return 'Mais vendido'
            case 'promocao':
                return 'Promoção'
        }
    }


    const getBannerStatus = () => {
        switch(bannerStatus){
            case 'ativo':
                return 'cursor-pointer text-green-solid-900 fill-green-solid-900 bg-green-solid-300'

            case 'inativo':
                return  'cursor-pointer text-red-solid-800 fill-red-solid-800 bg-red-solid-400'
        }
    }
    
    const handleEdit = () => {
        setOpenEdit(true)
    }

    return (
       

            <Card 
        
                cover={
                    <Image
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    preview={!previewVisible ? false : { visible: previewVisible, onVisibleChange: setPreviewVisible }}
                    
                    
                    />
                }
                actions={[
                    <MdOutlineEdit onClick={handleEdit} className="mx-auto" size={20} style={{fill:'darkgrey'}} key={"edit"} />,
                    <FaEye onClick={openPreview}  className="mx-auto" size={20} style={{fill:'darkgrey'}} key={"preview"} />,
                    <FaTrash className="mx-auto" size={15} style={{fill:'darkgrey'}} key={"delete"} />,
                
                ]}

                {...rest}
            >

            <Meta
                avatar={<Tooltip title={`Este banner pertence a categoria: ${getCategory()}`}>{getIcon()}</Tooltip>}
                title={bannerName}
                description={<Tag
                    key="status" 
                    className={getBannerStatus()} 
                    content={bannerStatus}
                   />}

                
            />
                {children}
                <BannersComponents.Edit setOpen={setOpenEdit} open={openEdit} />
            </Card>


 
    )
}