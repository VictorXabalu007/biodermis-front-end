import { Row, Table } from "@tanstack/react-table"



export type TableActionsProps<T> = {
    data:T,
    row: Row<T>
    table: Table<T>
}