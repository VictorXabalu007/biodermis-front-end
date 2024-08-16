import { Image, ImageProps } from "antd"
import { userImageFallback } from "../../../util/projectImage";


export const MiniImage = ({src, ...rest}:ImageProps) => {


    
    return (
        <Image
            src={src === null ? userImageFallback : src}
            {...rest}
        />
    );
    
}