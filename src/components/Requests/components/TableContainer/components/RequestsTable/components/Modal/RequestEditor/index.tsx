import { ElementType } from "react";
import { Heading } from "../../../../../../../../shared/Heading";
import { InputDatePicker } from "../../../../../../../../shared/Input/DatePicker";
import { Input } from "../../../../../../../../shared/Input/Input";
import { Text } from "../../../../../../../../shared/Text";
import { HiMiniPencilSquare } from "react-icons/hi2";


type TitleData = {
    title: string,
    icon? : ElementType,
    label: string,
}
const data: TitleData[] = [
    {
        title: '2925',
        label: 'Codigo do pedido'
    },
    {
        title: 'SEDEX',
        icon: HiMiniPencilSquare,
        label: 'Forma de envio'
    },
    {
        title: 'R$ 30,00',
        label: 'Valor do frete'
    },
]

export const RequestEditor = () => {

    return (

        <div className="flex min-h-screen flex-col">

            <div className="mb-10">

                <Heading.Root>
                    <Heading.Content content="Adicionar código de envio" />
                </Heading.Root>

            </div>

            <div className="mx-auto flex px-4 gap-12 items-center">


                {data.map((item,index) => {
                    
                    return(

                        <div key={index} className="flex items-center flex-col">

                            <Heading.Root>
                                {item.title}
                                {item.icon && <Heading.Icon className="text-brand-purple" icon={item.icon} />}
                            </Heading.Root>

                            <Text.Root className="text-gray-neutral-950 my-3">
                                <Text.Content content={item.label} />
                            </Text.Root>

                        </div>

                    )
                })}


            </div>

            <div className="my-3">

                <div className="my-3">
                    <Text.Root className="text-gray-neutral-600 my-2 font-[600] ">
                        <Text.Content content="Data de envio" />
                    </Text.Root>
                    <InputDatePicker />
                </div>

                <div className="my-3">
   
                    <Input.Root className="my-2">

                        <Input.Label 
                        content="Código de envio"
                        htmlFor="sendCode" 
                        className="text-gray-neutral-600 font-[600]"
                         />

                        <Input.System 
                        id="sendCode"
                        className="border-purple-solid-950 placeholder-purple-solid-950 text-sm font-[600]"
                        placeholder="Código de envio"
                        />

                    </Input.Root>
                </div>


            </div>



        </div>


    );
    
}