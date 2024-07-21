import { Heading } from "../../../Heading";



export const ChartHeadingContent = ({content}:{content:string}) => {
    
    return (

        <Heading.Root className="text-[18px]">
            <Heading.Content content={content} />
        </Heading.Root>

    );
}