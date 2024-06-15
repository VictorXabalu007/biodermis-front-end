import { Row } from "@tanstack/react-table";
import { CSSProperties } from "react";




export const validateRowSelected = <T,>(row:Row<T>):CSSProperties => {


    if(row.getIsSelected()){
        return {
            background: '#DCDCDC'
        }
    } 
    return {
        background: ''
    }
    

}