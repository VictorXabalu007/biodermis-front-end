
import { Flex } from "antd";
import { Spinner as Spin } from "flowbite-react";
import { Text } from "../Text";

type SpinnerProps = {
   content?:string;
}

export const Spinner = ({content = "Carregando dados..."}:SpinnerProps={}) => {

    return (

       <Flex align="center" vertical gap={2} justify="center">

            <Spin 

                 aria-label="loading data"
                 size="xl"
                 className="fill-brand-purple"
            
             />

             <Text.Root className="text-gray-neutral-400 font-[400]">
                <Text.Content content={content} />
             </Text.Root>
       
       </Flex>

    );


}