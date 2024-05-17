import { Select as S, SelectProps } from 'antd';
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from 'tailwind-merge';


interface Props extends SelectProps{
    className?: string;
}

export const SelectSystem = ({className, ...rest }: Props) => {

    return (
        <S  
            className={twMerge('border-gray-neutral-200 min-w-[205px]', className)}
            suffixIcon={<IoIosArrowDown className='fill-gray-neutral-400 text-xl' />}
            {...rest}
        />
    );
}
