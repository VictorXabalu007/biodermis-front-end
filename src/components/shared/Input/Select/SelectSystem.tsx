import { Select as S, SelectProps } from 'antd';
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from 'tailwind-merge';

type SelectOptions = {
    value: string,
    label: string,
}

interface Props extends SelectProps{
    options: SelectOptions[];
    className?: string;
    defaultValue: string;
}

export const SelectSystem = ({ options, className, defaultValue, ...rest }: Props) => {

    return (
        <S  
            className={twMerge('border-gray-neutral-200 min-w-[205px]', className)}
            defaultValue={defaultValue}
            suffixIcon={<IoIosArrowDown className='fill-gray-neutral-400 text-xl' />}
            options={options}
            {...rest}
        />
    );
}
