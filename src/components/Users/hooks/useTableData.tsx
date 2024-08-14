import { ColumnFilter, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { TableActions } from "../components/TableActions";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service/getUsers";
import { USERS_DATA } from "../../../constants/SessionStorageKeys/sessionStorageKeys";
import { getUserRole } from "../../../util/userRole";
import { UserAddress, UserCredentials } from "../../../@types/UserData/UserData";
import { TableSorterTitle } from "../../shared/Table/components/TableSorterTitle";
import { Flex } from "antd";
import { MiniImage } from "../../shared/Image/UserImage/miniImage";
import { getAddress } from "../service/getAddress";
import { UserData } from "../../../validations/registerUserValidation";
import { buildStatus } from "../../../functions/buildStatus";


const columnsHelper = createColumnHelper<UserCredentials>();

export const userData:UserData[] = 
JSON.parse(sessionStorage.getItem(USERS_DATA) ?? '{}')

export const useTableData = () => {

    const {data, isLoading} = useQuery<UserCredentials[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    })
    const {data:address} = useQuery<UserAddress[]>({
        queryKey: ['user-address'],
        queryFn: getAddress,
    })




    const [sorting,setSorting] = useState<any[]>([]);
    const [users, setUsers] = useState<UserCredentials[]>([])
    const [userAddress, setUserAddress] = useState<UserAddress[]>([])

    useEffect(()=> {
        if(address){
            setUserAddress(address)
        }
    },[address])



    useEffect(()=> {
   
        
        if(data && userAddress){
            setUsers(data.map(d => {

                const hasAddress = userAddress.find(add => add.usuario_id === d.id)
            
                if(hasAddress) {
                    return {
                        ...d,
                        ...hasAddress,
                        addressId: hasAddress.id
                    }
                } else {
                    return {
                        ...d,
                    }
                }
            }));
        }

        
            
    },[data,userAddress,address])

    
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

    const columns = useMemo(()=>[
            columnsHelper.accessor('srcperfil',{
                
                id: 'userImage',
                header: ()=> <div>#</div>,
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
            columnsHelper.accessor('nome', {
                header: ({header}) => <TableSorterTitle header={header} title="Nomes" />,
                cell: ({getValue}) => <p>{getValue()}</p>, 
                enableSorting:true,
            }),
            columnsHelper.accessor('email', {
                header: () => <p>Email</p>,
                cell: ({getValue}) => <p>{getValue()}</p>
            }),
            
            columnsHelper.accessor('telefone', {
                header: () => <p>Telefone</p> ,
                cell: ({getValue}) => <p>{getValue()}</p>
            }),

            columnsHelper.accessor('cargo_id', {
                header: () => <p>Tipo</p> ,
                cell: ({getValue}) => <p>{getUserRole(getValue())}</p>,
                filterFn: 'equals'
                
            }),
            columnsHelper.accessor('status',{
                id: 'status',
                header: () => <p>Status</p>,
                cell: ({getValue,row}) => (
                    buildStatus(getValue(), row.original, false)
                )
            }),
            columnsHelper.display({
                id: 'actions',
                header: () => <p>Ações</p> ,
                cell: ({row,table}) => (

                    <TableActions 
                     data={row.original}
                     row={row}
                     table={table}

                    />
                )
            }),

        ],[]);

        return {
            users,
            columns,
            columnFilters,
            sorting,
            setSorting,
            setColumnFilters,
            setUsers,
            isLoading
        }



}