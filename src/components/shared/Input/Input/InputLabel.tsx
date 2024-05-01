import { twMerge } from "tailwind-merge"


type InputLabelProps = {
    content: string,
    inputId: string
    className? : string
}

export const InputLabel = ({content,inputId,className}:InputLabelProps) => {

    return (
        <label className={twMerge("text-purple-solid-500 my-2 text-[14px] fw-medium", className)} htmlFor={inputId}>
            {content}
        </label>
    )

}