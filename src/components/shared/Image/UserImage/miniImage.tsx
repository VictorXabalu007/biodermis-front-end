import { Image, ImageProps } from "antd"
import noImage from '../../../../assets/no-image.png'

export const MiniImage = ({src, ...rest}:ImageProps) => {


    
    return (
        <Image
            src={src === null ? noImage : src}
            {...rest}
        />
    )
    
}