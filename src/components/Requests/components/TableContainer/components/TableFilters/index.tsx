
import { Button } from "../../../../../shared/Button"
import { Select } from "../../../../../shared/Input/Select"
import { Input } from "../../../../../shared/Input/Input"
import { IoFilter } from "react-icons/io5"
import { selectOptions } from "./util/selectOptions"
import { RequestFilterActions, useRequestFilter } from "../../../../context/FilterContext"
import { KeyType } from "./@types/KeyType"
import { useSearchValue } from "./hooks/useSearchValue"
import { useState } from "react"
import { SearchIcon } from "../../../../../shared/Icon/SearchIcon"


type SelectedValuesType = Record<KeyType, string>;

export const TableFilters = () => {

    const { dispatch } = useRequestFilter();
    const { handleSearchValue } = useSearchValue();

    const [selectedValues, setSelectedValues] = 
    useState<SelectedValuesType>({} as SelectedValuesType);

  

    const dispatchByKey = (value: string, key: KeyType) => {
        switch (key) {
            case 'latestDays':
                dispatch({
                    type: RequestFilterActions.setLatestDays,
                    payload: { latestDays: value }
                });
                break;
            case 'requests':
                dispatch({
                    type: RequestFilterActions.setRequest,
                    payload: { requests: value }
                });
                break;
            case 'status':
                dispatch({
                    type: RequestFilterActions.setStatus,
                    payload: { status: value }
                });
                break;
            case 'sellChannel':
                dispatch({
                    type: RequestFilterActions.setSellChannel,
                    payload: { sellChannel: value }
                });
                break;
        }
    }

    const handleSelectChange = (value: string, key: KeyType) => {
        dispatchByKey(value, key);
        setSelectedValues({ ...selectedValues, [key]: value });
    }

    return (

        <div className="flex flex-col gap-2 py-5">
            <div className="flex flex-wrap gap-3 w-full">
                <Input.System
                    onBlur={handleSearchValue}
                    className="lg:w-[350px]"
                    placeholder="Buscar pedidos"
                    icon={<SearchIcon />}
                />
                <Button.Root className="py-3 lg:w-[200px]">
                    <Button.Wrapper className="flex-row-reverse">
                        <Button.Icon icon={IoFilter} />
                        <Button.Content content="Filtros avançados" />
                    </Button.Wrapper>
                </Button.Root>
            </div>

            <div className="flex items-center flex-wrap gap-4">

                {selectOptions.map(item => (
                    <Select.Root key={item.key} className="flex-1 md:flex-none" icon={item.icon}>
                        <Select.System
                            defaultValue={item.defaultValue}
                            className="w-full"
                            value={selectedValues[item.key]}
                            options={item.options}
                            onSelect={(value) => handleSelectChange(value, item.key)}
                        />
                    </Select.Root>
                ))}
                
            </div>
        </div>
    );
}
