import { twMerge } from "tailwind-merge";
import { Button } from "../../../../../../shared/Button"
import { ButtonHTMLAttributes } from "react";


interface ModalFooterActionsProps extends ButtonHTMLAttributes<HTMLButtonElement> {


    key: string;
    content: string;
    className?:string;

}

export const ModalFooterAction = ({key, content, className, ...rest}:ModalFooterActionsProps) => {


    return (

        <div key={key}>
                
            <Button.Root
                className={twMerge("bg-white border border-brand-purple text-brand-purple hover:text-white",className)} 
                {...rest}
            >
                <Button.Wrapper>

                    <Button.Content content={content} />

                </Button.Wrapper>
            </Button.Root>
        
        </div>

    )


}