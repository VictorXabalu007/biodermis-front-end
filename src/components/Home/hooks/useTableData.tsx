import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react"
import { Consultors, consultorsData } from "../../Consultors/components/CTable/util/consultorsData";
import { WithDrawal, withdrawalData } from "../../WithdrawalRequests/components/WithdrawalTable/util/withdrawalData";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { ArrowUpDownIcon } from "../../shared/Icon/ArrowUpDownIcon";
import { Text } from "../../shared/Text";
import { IoIosArrowUp } from "react-icons/io";
import { NameItem } from "../../shared/Image/NameItem/NameItem";
import { NumericFormatter } from "../../shared/Formatter/NumericFormatter";


const columnsHelperConsultors = createColumnHelper<Consultors>();
const columnsHelperWithdrawal = createColumnHelper<WithDrawal>();

export const useTableData = () => {


    const [dataConsultors, setConsultorsData] = useState(consultorsData);
    const [dataWithdrawal, setWithdrawalData] = useState(withdrawalData);
    const [pagination, setPagination] = useState({
        pageIndex: 0, 
        pageSize: 3, 
      });


    const consultorsColumns = useMemo(()=> [

        columnsHelperConsultors.accessor('tops', {
            header: () => <div className="flex gap-2">Tops <ArrowUpDownIcon /> </div>,
            cell: ({getValue}) => {
    
                return (
    
                        getValue() === '1' || getValue() === '2' || getValue() === '3' ?
                        (buildPodium(getValue())) : (
    
                        <div className="flex px-2 gap-2 items-center">
    
                            <Text.Root className="text-purple-solid-950">
                                <Text.Content content={getValue()} />
                            </Text.Root>
    
                            <IoIosArrowUp className="text-lg text-green-flat" />
    
                        </div>
    
                        )
    
                );
            }
        }),
        columnsHelperConsultors.accessor('name', {
            header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /> </div>,
            cell: ({getValue}) => <NameItem name={getValue()} />
        }),

    ],[]);

    const withdrawalColumns = useMemo(()=> [

        columnsHelperWithdrawal.accessor('name', {
            header: () => <div className="flex gap-2">Nomes <ArrowUpDownIcon /></div>,
            cell: ({getValue}) => <NameItem name={getValue()} />
        }),
        columnsHelperWithdrawal.accessor('totalValueCurrent', {
            header: () => <p>Valor total em conta</p>,
            cell: ({getValue}) => <NumericFormatter value={getValue()} />,
    
          
        }),

    ],[]);

    const consultorsTable = useReactTable<Consultors>({
        data:dataConsultors,
        columns:consultorsColumns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        debugTable: true,
        state: {
            pagination
        },
        onPaginationChange: setPagination
        
 
      
    });

    const withdrawalTable = useReactTable<WithDrawal>({

        data:dataWithdrawal,
        columns:withdrawalColumns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        debugTable: true,
        state: {
            pagination
        },
        onPaginationChange: setPagination
 
    });

    return {

        consultorsTable,
        withdrawalTable

    }


}