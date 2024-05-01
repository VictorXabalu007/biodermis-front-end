import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { twMerge } from 'tailwind-merge';
import * as C from './styles'
import { IoCalendarNumberOutline } from 'react-icons/io5';

type DatePickerProps = {
    className?:string;
}

export const InputDatePicker = ({className}:DatePickerProps) => {


    const dateFormat = 'DD/MM/YYYY';
    const defaultValue = dayjs();

    return (

        <C.Wrapper>

            <DatePicker
            className={twMerge('w-full hover:border-gray-neutral-400 border-purple-solid-950 py-2 focus:border-gray-neutral-400',className)}
            defaultValue={[dayjs(defaultValue, dateFormat), 
                dayjs(defaultValue, dateFormat)]}
            format={dateFormat}
            style={{ textAlign: 'left' }}
            suffixIcon={<IoCalendarNumberOutline className='text-purple-solid-950 text-xl' />}
            
            />

        </C.Wrapper>

    );

}