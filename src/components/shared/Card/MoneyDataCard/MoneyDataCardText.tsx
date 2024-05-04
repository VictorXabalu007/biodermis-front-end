import { Heading } from "../../Heading"
import { Text } from "../../Text"

type MoneyCardTextProps = {



    title: string,
    subtitle: string,
}

export const MoneyDataCardText = ({title, subtitle}:MoneyCardTextProps) => {

    return (


        <div>

        <Heading.Root className="text-md">

            <Heading.Content content={title} />

        </Heading.Root>

            <Text.Root className="font-medium text-gray-neutral-600">
                
                <Text.Content content={subtitle}/>

            </Text.Root>


        </div>

    )

}