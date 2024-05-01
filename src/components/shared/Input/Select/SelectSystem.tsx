


import { Select as S } from 'antd';
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from 'tailwind-merge';

type SelectOptions = {
    value:string,
    label: string,
}

type SelectProps = {
    options: SelectOptions[]
    className?:string,
    defaultValue: string,
}

export const SelectSystem = ({options,className,defaultValue}:SelectProps) => {

    return (

    <S 
    
      className={twMerge('border-gray-neutral-200',className)}
      defaultValue={defaultValue}
      suffixIcon={<IoIosArrowDown className='fill-gray-neutral-400 text-xl' />}
      options={options}

    />

    )
}