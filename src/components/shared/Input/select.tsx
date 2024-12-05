import { Select as AntdSelect } from "antd";
import type { SelectProps } from "antd/lib";

const Select = ({ ...rest }: SelectProps) => (
	<AntdSelect
		{...rest}
		placeholder="selecione"
		size="large"
		className="min-w-[250px]"
		showSearch
	/>
);

export default Select;
