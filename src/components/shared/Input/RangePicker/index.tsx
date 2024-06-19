
import { DatePicker as DP } from 'antd';
import dayjs from 'dayjs';
import './styles.css';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from 'react';
import { Dayjs }  from 'dayjs';
import { NoUndefinedRangeValueType } from 'rc-picker/lib/PickerInput/RangePicker';
import { RangeDateActions, useRangeDate } from '../../../../context/RangeDate/RangeDateContext';
import { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DP;

export const InputRangePicker = (props:RangePickerProps) => {

    const [dateRange, setDateRange] = useState<[string,string]>(['', '']);
    const {dispatch} = useRangeDate();

    const handleDateChange = 
    useCallback((value: NoUndefinedRangeValueType<Dayjs> | null, dateStrings: [string, string]) => {

        if (value) {
            setDateRange(dateStrings);
        } else {
            setDateRange(['',''])
        }
  
    },[]);

    useEffect(()=> {

        if(dateRange){

            dispatch({
                type: RangeDateActions.setRangeDate,
                payload: {rangeDate: dateRange},
            })

        }

        

    },[handleDateChange,dateRange])

    const dateFormat = 'DD/MM/YYYY';
    const defaultValue = dayjs();

    return (

        <RangePicker
        {...props}
        style={{color: '#FFF'}}
        className='text-white w-full md:w-[230px] p-2 bg-brand-purple flex gap-0 hover:bg-brand-purple/75 hover:border-brand-purple/75'
        suffixIcon={<IoCalendarNumberOutline className='text-white text-2xl' />}
        defaultValue={[dayjs(defaultValue, dateFormat), 
            dayjs(defaultValue, dateFormat)]}
        format={dateFormat}
        onChange={handleDateChange}

      />

    );

}