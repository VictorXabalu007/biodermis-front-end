
import Title from "../../../Typography/typography-title";



export const ChartHeadingContent = ({content}:{content:string}) => {
    
    return (

        <Title className="text-[18px]">
            {content}
        </Title>

    );
}