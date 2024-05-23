import { Button } from "../../../../../shared/Button"



type ProductImageProps = {
    productName: string,
    onClick: () => void;
    // productImage: string
}
export const ProductImage = ({productName, onClick}:ProductImageProps) => {

    

    return (
        
        <div className="w-full">
        {/* TODO implementar caminho para imagem do produto aqui depois */}

        <div className="h-[150px] w-[150px]">

            <img 
            src="https://picsum.photos/200" 
            alt={productName} 
            className="rounded-md"
            style={{borderRadius: '5px 5px 0 0'}}
            />

            <Button.Root 
                onClick={onClick}
                style={{borderRadius: '0 0 5px 5px'}} 
                className="flex-1 w-full"
            >
                <Button.Wrapper>
                    <Button.Content content="Editar produto" />
                </Button.Wrapper>
            </Button.Root>

        </div>

    </div>
    )
}