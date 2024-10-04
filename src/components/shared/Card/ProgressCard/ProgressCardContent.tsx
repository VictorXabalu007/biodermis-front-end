import { NumericFormatter } from "../../Formatter/numeric-formatter"
import Title from "../../Typography/typography-title"

type ProgressCardContentProps = {
    title: number,
    subText: string
}

export const ProgressCardContent = ({title, subText}:ProgressCardContentProps) => {
    return (
        <div>

            <Title>
                <NumericFormatter value={title} />
            </Title>

            <p className="my-3 text-gray-neutral-600 font-semibold">
                {subText}
            </p>

        </div>  
    )
}