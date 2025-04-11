import { DatePicker as DP } from "antd";
import dayjs from "dayjs";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import type { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import {
	RangeDateActions,
	useRangeDate,
} from "../../../context/RangeDate/RangeDateContext";
import type { RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DP;

export const InputRangePicker = (props: RangePickerProps) => {
	const today = dayjs().format("DD/MM/YYYY");
	const [dateRange, setDateRange] = useState<[string, string]>(
		props.defaultValue && props.defaultValue[0] && props.defaultValue[1]
			? [
				props.defaultValue[0].format("DD/MM/YYYY"),
				props.defaultValue[1].format("DD/MM/YYYY"),
			]
			: [today, today]
	);
	const { dispatch } = useRangeDate();

	const handleDateChange = useCallback(
		(
			value: NoUndefinedRangeValueType<Dayjs> | null,
			dateStrings: [string, string],
		) => {
			if (value) {
				setDateRange(dateStrings);
			} else {
				setDateRange(["01/01/1970", today]);
			}
		},
		[],
	);

	useEffect(() => {
		if (dateRange) {
			dispatch({
				type: RangeDateActions.setRangeDate,
				payload: { rangeDate: dateRange },
			});
		}
	}, [handleDateChange, dateRange]);

	const dateFormat = "DD/MM/YYYY";
	const defaultValue = dayjs();

	return (
		<RangePicker
			{...props}
			style={{ color: "#FFF" }}
			className="text-white w-full md:w-[250px] p-2 bg-brand-purple flex gap-0 hover:bg-brand-purple/75 hover:border-brand-purple/75"
			suffixIcon={<IoCalendarNumberOutline className="text-white text-2xl" />}
			defaultValue={props.defaultValue || [
				dayjs(defaultValue, dateFormat),
				dayjs(defaultValue, dateFormat),
			]}
			format={dateFormat}
			onChange={handleDateChange}
		/>
	);
};
