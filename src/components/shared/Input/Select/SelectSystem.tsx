import { Select as S, SelectProps as AntSelectProps } from 'antd';
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from 'tailwind-merge';

type SelectOptions = {
    value: string,
    label: string,
}

interface SelectProps extends Omit<AntSelectProps<string>, 'options'> {
    options: SelectOptions[];
    className?: string;
    defaultValue: string;
}

export const SelectSystem = ({ options, className, defaultValue, ...rest }: SelectProps) => {

    return (
        <S
            className={twMerge('border-gray-neutral-200', className)}
            defaultValue={defaultValue}
            suffixIcon={<IoIosArrowDown className='fill-gray-neutral-400 text-xl' />}
            options={options}
            {...rest}
        />
    );
}
