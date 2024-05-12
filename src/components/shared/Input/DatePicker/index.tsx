import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { twMerge } from 'tailwind-merge';
import * as C from './styles'
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { DatePickerProps as AntDatePickerProps } from 'antd/es/date-picker';

interface DatePickerProps extends AntDatePickerProps {

    className?: string;
    formatted?:string,
    
}

export const InputDatePicker = ({className,formatted, ...rest}:DatePickerProps) => {


    const dateFormat = formatted ? formatted : 'DD/MM/YYYY';
    const defaultValue = dayjs();

    return (

        <C.Wrapper>

            <DatePicker
            
            className={twMerge('w-full hover:border-gray-neutral-400 border-purple-solid-950 py-2 focus:border-gray-neutral-400',className)}
            //@ts-ignore
            defaultValue={[dayjs(defaultValue, dateFormat), 
                dayjs(defaultValue, dateFormat)]}
            format={dateFormat}
            suffixIcon={
            <IoCalendarNumberOutline 
            className={'fill-purple-solid-950 text-xl'} 
            />}
            {...rest}
            />

        </C.Wrapper>

    );

}