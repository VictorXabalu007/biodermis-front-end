import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export interface RegisterFieldProps<T extends FieldValues>{

    register?: UseFormRegister<T>
    errors: FieldErrors<T>,
    control?:Control<T,any>


}