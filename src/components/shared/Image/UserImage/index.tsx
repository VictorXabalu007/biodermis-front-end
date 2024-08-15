import { Image } from "antd";
import { twMerge } from "tailwind-merge"
import noImage from '../../../../assets/no-image.png'

type UserImageProps = {
    image:string | null;
    className?:string
    imageClassname?: string
}


export const UserImage = ({className,image, imageClassname}:UserImageProps) => {
    
    return (


    <div className={twMerge("flex items-center justify-center mt-5",className)}>

        <div style={{
                maxWidth: '200px',
                maxHeight: '200px'
        }} className="shadow-sm shadow-purple-solid-500 rounded-[100%]">
           
            <Image 
            src={image ? image : noImage}
            style={{
                maxWidth: '200px',
                maxHeight: '200px'
            }}
            className={twMerge("rounded-[100%] border border-brand-purple ",imageClassname)}
            alt="user image" 
            preview={false}
             />

        </div>

    </div>

    )
}