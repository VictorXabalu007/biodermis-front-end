import { TableProps } from 'antd/lib';
import { NumericFormatter } from '../../../../shared/Formatter/NumericFormatter.tsx';
import { NameItem } from '../../../../shared/Image/NameItem/NameItem.tsx';

type DataType = {

    key: string,
    value: number,
    name: string,

}

export const requestData: DataType[] = [


    {   
        key: '1',
        value:1500,
        name: 'Username'
    },
    {   
        key: '2',
        value: 1500,
        name: 'Username'
    },
    {   
        key: '3',
        value:1500,
        name: 'Username'
    },

];

export const requestColumns : TableProps<DataType>['columns'] = [

    {
        title: 'Nome',
        key: 'name',
        dataIndex: 'name',
        render: (name) => {
            return (

              <NameItem name={name} />

            );
        }

    },
    
    {
        title: 'Valor solicitado',
        key: 'value',
        dataIndex: 'value',
        render: (value) => {
            return (

                <NumericFormatter
                value={value}
                />
              
            )
    }
   
    },

]