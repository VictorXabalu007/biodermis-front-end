import { FaArrowLeftLong } from "react-icons/fa6";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type SubHeaderProps = {
    linkText:string,
    heading:string,
}

export const SubHeader = ({linkText,heading}:SubHeaderProps) => {

    
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (

        <div className="flex items-center gap-10">

            <Button onClick={handleGoBack} type="text">

                <FaArrowLeftLong className="text-brand-purple hover:text-brand-purple/75" />
            
            </Button>

            <div>

                <Text.Root className="text-[12px] font-[300]">
                    <Text.Content content={linkText} />
                </Text.Root>

                <Heading.Root>
                    <Heading.Content 
                    content={heading}
                    />
                </Heading.Root>

            </div>


        </div>

    );
}