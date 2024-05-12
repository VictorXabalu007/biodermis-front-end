import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "../Link";
import { Text } from "../Text";
import { Heading } from "../Heading";

type SubHeaderProps = {
    path:string,
    linkText:string,
    heading:string,
}

export const SubHeader = ({path,linkText,heading}:SubHeaderProps) => {

    return (

        <div className="flex items-center gap-10">

            <Link.Root path={path}>

                <Link.Icon 
                icon={FaArrowLeftLong} 
                className="text-brand-purple hover:text-brand-purple/75"
                />

            </Link.Root>

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