import { FaArrowLeftLong } from "react-icons/fa6";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Text } from "../Typography/typography-text";
import { TitleProps } from "antd/es/typography/Title";


type SubHeaderProps = {
    linkText?:string,
    heading:string,
    hasLink?:boolean
    subtext?:string
} & TitleProps

export const SubHeader = ({
    linkText,
    heading,
    hasLink = true,
    subtext,
    ...rest
}:SubHeaderProps) => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
        
  
    return (

        <div className="flex items-center gap-10">

            {hasLink && (

                <Button onClick={handleGoBack} type="text">

                    <FaArrowLeftLong className="text-brand-purple hover:text-brand-purple/75" />
                
                </Button>

            )}

            <div>

                <Text className="text-[12px] font-[300]">
                    {linkText}
                </Text>

                <Typography.Title  
                    {...rest}
                    level={4}
                >
                    {heading}
                </Typography.Title>

                <Text size="sm">
                    {subtext}
                </Text>
          

            </div>


        </div>

    );
}