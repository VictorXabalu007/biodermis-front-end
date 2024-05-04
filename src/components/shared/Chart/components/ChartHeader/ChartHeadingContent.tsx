import { Heading } from "../../../Heading";



export const ChartHeadingContent = ({content}:{content:string}) => {
    
    return (

        <Heading.Root>
            <Heading.Content content={content} />
        </Heading.Root>

    );
}