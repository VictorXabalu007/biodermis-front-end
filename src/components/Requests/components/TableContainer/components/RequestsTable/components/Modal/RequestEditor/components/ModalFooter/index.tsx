
import { Button } from "../../../../../../../../../../shared/Button";



type ModalFooterProps = {
    handleClose: () => void;
}

export const ModalFooter = ({handleClose}: ModalFooterProps) => {


    return (

        
        <div className="flex w-full gap-2 items-end justify-content-end">
                    

        <div className="flex gap-2 ms-auto">

            <div key={'cancel'}>
        
            <Button.Root className="bg-white border border-brand-purple text-brand-purple hover:text-white" key={"cancel"} onClick={handleClose}>
                <Button.Wrapper>

                    <Button.Content content="cancelar" />

                </Button.Wrapper>
            </Button.Root>
            </div>

            <div key={'ok'}>
            <Button.Root key={"ok"} onClick={handleClose}>
                <Button.Wrapper>

                    <Button.Content content="confirmar" />

                </Button.Wrapper>
            </Button.Root>

        </div>

        </div>

    
    </div>



    )


}