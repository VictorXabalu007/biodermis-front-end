import { Heading } from "../../../../../../../../shared/Heading";
import { InputDatePicker } from "../../../../../../../../shared/Input/DatePicker";
import { Input } from "../../../../../../../../shared/Input/Input";
import { Text } from "../../../../../../../../shared/Text";


const data = [
    {
        title: '2925',
        label: 'Codigo do pedido'
    },
    {
        title: <>SEDEX</>,
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
                    <Heading.Content content="Adiconar código de envio" />
                </Heading.Root>

            </div>

            <div className="mx-auto flex px-4 gap-12 items-center">


                {data.map(item => {
                    
                    return(

                    <div className="text-center">

                        <Heading.Root>
                            {item.title}
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
                        inputId="sendCode" 
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