import { LabelHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"


interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {

    content: string
    className? : string

}

export const InputLabel = ({content,className,...rest}:InputLabelProps) => {

    return (
        <label 
        className={twMerge("text-purple-solid-500 mb-2 text-[14px] fw-medium", className)}
        {...rest}
        >
            {content}
        </label>
    )

}