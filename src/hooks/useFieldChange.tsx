import { useState } from "react";

type UseFieldChangeProps<T> = {
    data: T
}


export const useFieldChange = <T,>({data}:UseFieldChangeProps<T>) => {



    const [fields, setFields] = useState<T>({
        ...data
    });

    
    const handleChange = (fieldName: keyof T, value: React.ChangeEvent<HTMLInputElement> | string) => setFields(prev => (
        {...prev, 
        [fieldName]: typeof value === 'string' ? value : value.target.value}
    ));

    return {
        fields,
        handleChange

    }

}