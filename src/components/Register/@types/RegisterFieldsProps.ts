import { Control, FieldErrors, FieldValues } from "react-hook-form";


export interface RegisterFieldProps<T extends FieldValues>{

    errors: FieldErrors<T>,
    control:Control<T>

}