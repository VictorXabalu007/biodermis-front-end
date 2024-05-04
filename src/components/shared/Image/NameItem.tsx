import { Text } from "../Text"


export const NameItem = ({name}:{name:string}) => {

    return (
        
    <div className='flex items-center gap-4'>

        <div className='bg-slate-300 p-5 rounded-[100%]'></div>

        <Text.Root className="text-md font-[400] text-gray-neutral-600">
            <Text.Content content={name} />
        </Text.Root>

    </div>

    )
}