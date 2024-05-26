import { Header, flexRender } from "@tanstack/react-table";
import * as C from '../../../../../../styles/TableStyles/styles'
import { Button, Dropdown , Flex,  MenuProps} from "antd";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { ProductsData } from "../../../../../Register/RegisterProducts/components/FormContainer";





export const TableHeader = ({header}:{header: Header<ProductsData, unknown>}) => {

    const isSorted = header.column.getIsSorted();

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <p>
               {isSorted === 'desc' ? 'Ordenar: crescente' : 'Ordenar: Decrescente'}
            </p>
          ),
          onClick: header.column.getToggleSortingHandler()
        },
    

      ];


    return (
        
        header.isPlaceholder ? null : (
            <C.Th key={header.id}>
                <Flex align="center" justify="center" gap={2} className="px-2">
                    <div>
                        {flexRender(header.column.columnDef.header,
                            header.getContext())}
                    </div>
                    {header.column.columnDef.enableSorting &&
                    
                    <>
                        <Dropdown
                        className="menu"
                        menu={{ items }} arrow={{ pointAtCenter: true }}>
                            <Button size="small">
                                    !
                            </Button>
                        </Dropdown>
                        {isSorted &&
                        <div>
                            {isSorted === 'desc' ? <FaArrowDown /> : <FaArrowUp />}
                        </div>
                        
                        
                        }
                    </>
                }
                </Flex>

            </C.Th>
        )
    )



}