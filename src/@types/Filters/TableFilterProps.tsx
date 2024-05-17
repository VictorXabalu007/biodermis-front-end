import { ColumnFilter } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";


export type TableFiltersProps = {
    columnsFilters: ColumnFilter[];
    setColumnFilters: Dispatch<SetStateAction<ColumnFilter[]>>;
  };