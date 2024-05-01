import { Heading } from "../../../../../shared/Heading"
import { InputRangePicker } from "../../../../../shared/Input/RangePicker"


export const TableHeader = () => {
    return (
        <div className="flex flex-wrap justify-between">
            <Heading.Root>
                <Heading.Content content="Pedidos" />
            </Heading.Root>

            <InputRangePicker />
        </div>
    )
}