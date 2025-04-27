import { Button } from "antd";
import { type ReactNode, useState } from "react";
import { UserRole } from "../../../util/userRole";

interface FilterButtonsProps {
	options: { label: ReactNode; value: number }[];
	onFilterChange: (values: number[]) => void;
	onChangeTab: (value: number) => void;
}

const FilterButtons = ({ options, onFilterChange, onChangeTab }: FilterButtonsProps) => {
	const [activeValue, setActiveValue] = useState<number>(options[0].value);

	const handleClick = (value: number) => {
		setActiveValue(value);
		console.log({ value })
		let filterValues: number[];
		if (value === 0) {
			filterValues = options.map((option) => option.value);
		} else if (value === -1) {
			filterValues = [UserRole.ADMIN];
		} else if (value === UserRole.USER) {
			filterValues = [UserRole.USER];
		} else {
			filterValues = [value];
		}
		onChangeTab(value);
		onFilterChange(filterValues);
	};

	return (
		<div className="flex gap-2 text-white">
			{options
				.filter(
					(option) =>
						option.label === "Acessos" ||
						option.label === "Cliente" ||
						option.label === "Todos",
				)
				.map((option) => (
					<Button
						className={
							option.value === activeValue
								? "bg-white text-[#DCBFD3] border-[#DCBFD3] border-2 font-semibold"
								: ""
						}
						key={option.value}
						onClick={() => handleClick(option.value)}
					>
						{option.label}
					</Button>
				))}
		</div>
	);
};

export default FilterButtons;
