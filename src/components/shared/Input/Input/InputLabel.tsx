

type InputLabelProps = {
    content: string,
    inputId: string
}

export const InputLabel = ({content,inputId}:InputLabelProps) => {

    return (
        <label className="text-black text-[14px] fw-medium" htmlFor={inputId}>
            {content}
        </label>
    )

}