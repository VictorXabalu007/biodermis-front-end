import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react"
import { WithDrawal } from "../../WithdrawalRequests/util/withdrawalData";
import { buildPodium } from "../../shared/Table/functions/buildPodium";
import { Text } from "../../shared/Text";
import { IoIosArrowUp } from "react-icons/io";
import { NumericFormatter } from "../../shared/Formatter/numeric-formatter";
import { UserCredentials } from "../../../@types/UserData/UserData";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { useWithdrawData } from "../../WithdrawalRequests/hooks/useWithdrawData";
import { useConsultorData } from "../../Consultors/hooks/useConsultorData";
import { Flex } from "antd";
import { MiniImage } from "../../shared/Image/mini-image";


const columnsHelperConsultors = createColumnHelper<UserCredentials>();
const columnsHelperWithdrawal = createColumnHelper<WithDrawal>();

export const useTableData = () => {

    
    const {consultor, isLoading:isLoadingConsultores,getConsultorName, isConsultorsEmpty, getConsultorImageById} = useConsultorData();

    const {data:withdraw, isLoading:isLoadingWithdrawal, accessBalance, isWithdrawEmpty} = 
    useWithdrawData({enableFilterDate: false});



    const [withDrawData, setWithdrawData] = useState<WithDrawal[]>([]);

    useEffect(()=> {

        if(withdraw) {


            setWithdrawData(withdraw.map(d => ({
                ...d,
                nome_consultor: getConsultorName(d.consultor_id),
                saldo_disp: accessBalance.saldodisp
            })))

        }

        

    },[withdraw])

    const [sortingConsultors, setSortingConsultors] = useState<any[]>([])
    
    
    const [consultorPagination, setConsultorsPagination] = useState({
        pageIndex: 0, 
        pageSize: 3, 
      });
    const [withdrawPagination, setWithdrawPagination] = useState({
        pageIndex: 0, 
        pageSize: 3, 
      });


    const consultorsColumns = useMemo(()=> [

        columnsHelperConsultors.accessor('rank', {
            header: ({header}) => <TableSorterTitle header={header} title="Tops" />,
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
        columnsHelperConsultors.accessor('srcperfil',{
            id: 'userImage',
            header: () => <div>#</div>,
            cell: ({getValue}) => (
                <Flex justify="center" align="center">
                    <MiniImage 
                        style={{
                            maxWidth: '30px'
                        }}
                        src={getValue() as string}
                    />
                </Flex>
            )
           
          
        }),

        columnsHelperConsultors.accessor('nome', {
            header: ({header}) => <TableSorterTitle header={header} title="Nomes" />,
            cell: ({getValue}) => <p>{getValue()}</p>,
            enableSorting:true
        })

    ],[]);

    const withdrawalColumns = useMemo(()=> [

        columnsHelperWithdrawal.accessor('consultor_id',{
            id: 'userImage',
            header: ()=> <div>#</div>,
            cell: ({getValue}) => {

                return (

                    <Flex  justify="center" align="center">
                        <MiniImage 
                            style={{
                                maxWidth: '30px',
                                paddingLeft: '3px'
                            }}
                            src={getConsultorImageById(getValue()) as string}
                        />
                    </Flex>
                )
            }
        }),
        columnsHelperWithdrawal.accessor('nome_consultor', {
            header: ({header}) => <TableSorterTitle header={header} title="Nomes" />,
            cell: ({getValue}) =>getValue(),
            enableSorting: true,
        }),
        columnsHelperWithdrawal.accessor('valorsaque', {
            header: () => <p>Valor total em conta</p>,
            cell: ({getValue}) => <NumericFormatter value={parseFloat(getValue())} />,
    
          
        }),

    ],[getConsultorName]);

    const consultorsTable = useReactTable<UserCredentials>({
        
        data:consultor,
        columns:consultorsColumns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        state: {
            pagination:consultorPagination,
            sorting: sortingConsultors
        },
        onPaginationChange: setConsultorsPagination,
        onSortingChange: setSortingConsultors,
        getSortedRowModel: getSortedRowModel(),
        
      
    });

    const withdrawalTable = useReactTable<WithDrawal>({

        data:withDrawData,
        columns:withdrawalColumns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel:getCoreRowModel(),
        state: {
            pagination:withdrawPagination
        },
        onPaginationChange: setWithdrawPagination
 
    });

    return {

        consultorsTable,
        withdrawalTable,
        isConsultorsEmpty,
        isWithdrawEmpty,
        isLoadingConsultores,
        isLoadingWithdrawal,
        sortingConsultors,
        setSortingConsultors

    }


}