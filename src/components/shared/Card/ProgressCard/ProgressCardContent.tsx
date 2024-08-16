import { NumericFormatter } from "../../Formatter/numeric-formatter"
import { Heading } from "../../Heading"
import { Text } from "../../Text"

type ProgressCardContentProps = {
    title: number,
    subText: string
}

export const ProgressCardContent = ({title, subText}:ProgressCardContentProps) => {
    return (
        <div>

            <Heading.Root>
                <NumericFormatter value={title} />
            </Heading.Root>

            <Text.Root className="my-3 text-gray-neutral-600 font-semibold">
                <Text.Content content={subText} />
            </Text.Root>

        </div>  
    )
}