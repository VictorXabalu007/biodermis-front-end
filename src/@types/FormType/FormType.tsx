import { Row, Table } from "@tanstack/react-table";


export interface FormType<T> {
    
    isReadonly?: boolean;
    data: T;
    row: Row<T>
    table: Table<T>
    onSubmit: (data:T) => void
    
}