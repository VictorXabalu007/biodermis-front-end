import { twMerge } from "tailwind-merge";
import { Button } from "../../../../../../shared/Button"


type ModalFooterActionsProps = {

    onClick?: () => void;
    key: string;
    content: string;
    className?:string;

}

export const ModalFooterAction = ({key, content, onClick, className}:ModalFooterActionsProps) => {


    return (

        <div key={key}>
                
            <Button.Root 
                className={twMerge("bg-white border border-brand-purple text-brand-purple hover:text-white",className)} 
                onClick={onClick}
            >
                <Button.Wrapper>

                    <Button.Content content={content} />

                </Button.Wrapper>
            </Button.Root>
        
        </div>

    )


}