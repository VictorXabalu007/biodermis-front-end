import { Heading } from "../../../../../shared/Heading"
import { DatePicker } from "../../../../../shared/Input/DatePicker"


export const TableHeader = () => {
    return (
        <div className="flex justify-between">
            <Heading.Root>
                <Heading.Content content="Pedidos" />
            </Heading.Root>

            <DatePicker />
        </div>
    )
}