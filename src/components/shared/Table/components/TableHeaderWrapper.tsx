import { twMerge } from "tailwind-merge";
import { Heading } from "../../Heading";


type TableHeaderProps = {
    className?:string;
    children:React.ReactNode,
    heading: string;
}

export const TableHeaderWrapper = ({children, className, heading}:TableHeaderProps) => {

    return (

        <div className={twMerge(className, 'mb-5 gap-5 flex flex-col flex-wrap')}>

            
            <Heading.Root>
                <Heading.Content content={heading} />
            </Heading.Root>


            {children}
            
        </div>

    )

}