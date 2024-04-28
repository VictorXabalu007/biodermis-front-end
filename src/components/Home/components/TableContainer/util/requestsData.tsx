import { TableProps } from 'antd/lib';
import { Text } from '../../../../shared/Text';
import { NameItem } from './components/NameItem.tsx';

type DataType = {

    key: string,
    value: string,
    name: string,

}

export const requestData: DataType[] = [


    {   
        key: '1',
        value:'R$ 1,500.00',
        name: 'Username'
    },
    {   
        key: '2',
        value: 'R$ 1,500.00',
        name: 'Username'
    },
    {   
        key: '3',
        value:'R$ 1,500.00',
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

                <Text.Root className='font-semibold text-gray-neutral-600'>
                    <Text.Content content={value} />
                </Text.Root>
              
            )
    }
   
    },

]