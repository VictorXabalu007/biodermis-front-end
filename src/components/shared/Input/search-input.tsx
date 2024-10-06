import { Input, InputProps } from "antd";
import { SearchIcon } from "../Icon/search";
import { colors } from "../../../theme/colors";




const SearchInput = ({...rest}:InputProps) => {

  return (

    <Input
        size="large"
        className="w-[550px]"
        prefix={<SearchIcon color={colors.primaryPurple}  />}
       
        {...rest}
    />

  );

}

export default SearchInput