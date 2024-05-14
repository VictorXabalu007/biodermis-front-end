import { Table as TB } from 'antd';
import { TableProps } from 'antd/lib';
import { CSSProperties } from 'react';
import * as C from './styles'


interface TableConfig <T> extends Omit<TableProps<T>, 'columns' | 'dataSource' | 'onChange'> {

  data: T[],
  columns: TableProps<T>['columns']
  style?: CSSProperties,
  className?:string,
  onChange?: (...args: any) => void

}



export const Table:React.FC<TableConfig<any>> = ({data,columns,style,className,onChange, ...rest}) => {

    return (

      <div>
        <C.Wrapper>

              <TB
                
                className={className}
                style={style}
                columns={columns}
                dataSource={data}
                size='small'
                scroll={{ x: "max-content" }}
                onChange={onChange}
                {...rest}
                
            
              />



        </C.Wrapper>
      </div>

    )

}