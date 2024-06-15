
import { Heading } from "../../../../../../../../shared/Heading"
import { Text } from "../../../../../../../../shared/Text"
import { NumericFormatter } from "../../../../../../../../shared/Formatter/NumericFormatter"
import { useProductsData } from "../../../../../../../../Products/hooks/useProductsData"
import { useEffect, useState } from "react"
import { ProductsType } from "../../../../../../../../Products/service/getProducts"
import { Image } from "antd"

export const ModalProducts = ({requestsId}:{requestsId: number[]}) => {


    const [products, setProducts] = useState<ProductsType[]>([]);

    const {getProductsById} = useProductsData();



    useEffect(() => {

        const fetchedProducts = getProductsById(requestsId);

        setProducts(fetchedProducts);
        

      }, [requestsId, getProductsById]);


    const productCounts = products.reduce((acc, product) => {
        if (product) {
            acc[product.id] = (acc[product.id] || 0) + 1;
        }
        return acc;
    }, {} as { [key: number]: number });


    return (

        products.map(p => (

            <div key={p.id} className="my-2">

                    <div className="flex justify-between gap-2">
                        
                        <div className="flex gap-2">

                       

                                <Image
                                    width={185}
                                    src={p.imagePath}
                                    alt={p.nome}
                                    style={{
                                        borderRadius: '4px',
                                        objectFit: 'cover'
                                    }}
                                />


                            <div className="flex flex-col text-start gap-3">
                                <Heading.Root className="text-[16px] font-semibold">
                                    <Heading.Content content={`#${p.id < 10 ? '0' + p.id : p.id}Pedido`} />
                                </Heading.Root>
                                <Text.Root className="mt-1">
                                    <Text.Content content={p.nome} />
                                </Text.Root>
                                <Text.Root className="mt-1">
                                    <Text.Content content={`Quant: ${productCounts[p.id]}`} />
                                </Text.Root>
                            </div>

                        </div>

                        <div>

                            <Text.Root className="mt-1 font-medium text-purple-solid-500">
                                <NumericFormatter 
                                    value={parseFloat(p.valorvenda)}
                                />
                            </Text.Root>

                        </div>

                    </div>


                </div>


        ))

    )
}