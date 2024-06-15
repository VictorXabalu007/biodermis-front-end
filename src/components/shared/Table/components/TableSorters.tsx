
import { Header, flexRender } from "@tanstack/react-table";
import * as C from '../../../../styles/TableStyles/styles'
import { Flex} from "antd";



type TableSortersProps<T> = {
    header: Header<T, unknown>
}

export const TableSorters = <T,>({header}:TableSortersProps<T>) => {




    return (
        
        header.isPlaceholder ? null : (
            <C.Th className="cursor-pointer" key={header.id}>
                <Flex align="center" justify="center" gap={2} className="px-2">
                    <div onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header,
                            header.getContext())}
                    </div>
  
                </Flex>

            </C.Th>
        )
    )

}