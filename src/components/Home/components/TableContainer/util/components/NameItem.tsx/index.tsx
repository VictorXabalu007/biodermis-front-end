import { Text } from "../../../../../../shared/Text"


export const NameItem = ({name}:{name:string}) => {
    return (
    <div className='flex items-center gap-2'>
        <div className='bg-slate-300 p-5 rounded-[100%]'></div>
        <Text.Root className='font-medium text-gray-neutral-600'>
            <Text.Content content={name} />
        </Text.Root>
    </div>
    )
}