
import { Input } from "../../../../../../shared/Input/Input";



export const FormStep1 = () => {

    

    return (

        <form>
            
            <div className="flex flex-col gap-5">

          
            <div>

                <Input.Root>
                
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Nome"
                    htmlFor="name"
                    />
                    <Input.System
                    placeholder={'name...'}
                    id="name"
                    />

                </Input.Root>

            </div>

            <div className="flex gap-2">

                <Input.Root>
                    
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="CPF"
                    htmlFor="cpf"
                    />
                    <Input.System
                    placeholder={'111111111'}
                    id="cpf"
                    />

                </Input.Root>

                <Input.Root>
                    
                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="Telefone"
                    htmlFor="phone"
                    />
                    <Input.System
                    placeholder={'phone...'}
                    id="phone"
                    />

                </Input.Root>

            </div>

            <div>

                <Input.Root>

                    <Input.Label 
                    className="text-gray-neutral-400"
                    content="E-mail"
                    htmlFor="email"
                    />
                    <Input.System
                    placeholder={'email...'}
                    id="email"
                    />

                </Input.Root>

                </div>
                </div>
        </form>

    );
}