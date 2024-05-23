

type ModalFooterProps = {
   children: React.ReactNode;
}

export const ModalFooterRoot = ({children}: ModalFooterProps) => {

    return (
        
        <div className="flex w-full gap-2 items-end justify-content-end">
                    

            <div className="flex gap-2 ms-auto">

                {children}

             </div>

    
    </div>



    )


}