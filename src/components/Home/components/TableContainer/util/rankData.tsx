import { TableProps } from 'antd/lib';
import { buildPodium } from '../../../../shared/Table/functions/buildPodium';
import { NameItem } from '../../../../shared/Image/NameItem/NameItem';


type DataType = {

    key: string,
    rank: string,
    name: string,

}

export const rankData: DataType[] = [


    {   
        key: '1',
        rank:'1',
        name: 'Username'
    },
    {   
        key: '2',
        rank: '2',
        name: 'Username'
    },
    {   
        key: '3',
        rank:'3',
        name: 'Username'
    },

];



export const rankColumns : TableProps<DataType>['columns'] = [

    {
        title: 'Rank',
        key: 'rank',
        dataIndex: 'rank',
        render: (rank) => {
        
            return (
                buildPodium(rank)
            )
    
        }

    },

    {
        title: 'Nomes',
        key: 'name',
        dataIndex: 'name',
        render: (name) => {
            return (

                <NameItem name={name} />
  
            );
        }
    },

]