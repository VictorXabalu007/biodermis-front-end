import { twMerge } from "tailwind-merge"

type UserImageProps = {
    // image:string;
    className?:string
}


export const UserImage = ({className}:UserImageProps) => {
    
    return (


    <div className={twMerge("flex items-center justify-center mt-10",className)}>

        <div className="shadow-md shadow-purple-solid-500 rounded-[100%]">

            {/* TODO Colocar o caminho da imagem aqui depois */}
            <img 
            src="https://picsum.photos/200" 
            className="rounded-[100%] w-[100px] h-[100px] border border-brand-purple "
            alt="user image" 
             />

        </div>

    </div>

    )
}