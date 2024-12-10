import { Button } from "antd";
import { type ReactNode, useState } from "react";

interface FilterButtonsProps {
	options: { label: ReactNode; value: string }[];
	onFilterChange: (selectedOption: string) => void;
}

const FilterButtons = ({ options, onFilterChange }: FilterButtonsProps) => {
	const [activeValue, setActiveValue] = useState<string>(options[1].value);

	const handleClick = (value: string) => {
		setActiveValue(value);
		onFilterChange(value);
	};

	return (
		<div className="flex gap-2 text-white">
			{options.map((option) => (
				<Button
					key={option.value}
					className={
						option.value === activeValue
							? "bg-white text-[#DCBFD3] border-[#DCBFD3] border-2 font-semibold"
							: ""
					}
					onClick={() => handleClick(option.value)}
				>
					{option.label}
				</Button>
			))}
		</div>
	);
};

export default FilterButtons;
