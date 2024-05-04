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

export const Table = ({data,columns,style,className,onChange, ...rest}:TableConfig<any>) => {

    return (

      <C.Wrapper>

            <TB

              className={className}
              style={style}
              columns={columns}
              dataSource={data}
              pagination={false} 
              size='small'
              scroll={{ x: "max-content" }}
              onChange={onChange}
              {...rest}
            
            />

      </C.Wrapper>

    )

}