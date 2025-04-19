
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputRef, notification, Space, TableColumnType } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useRef, useState } from "react";
import { colors } from "../theme/colors";

type UseTableActionsProps<T extends { id: React.Key }> = {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
    canRedisplay?: boolean
}

export const useTableActions = <T extends { id: React.Key }>({
    data,
    setData,
    canRedisplay = false
}: UseTableActionsProps<T>) => {
    type DataIndex = keyof T;

    const [_, setSearchText] = useState("");
    const [__, setSearchedColumn] = useState<DataIndex | "">("");
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [originalData, setOriginalData] = useState<T[]>([]);
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [isFiltered, setIsFiltered] = useState(false)

    useEffect(() => {
        if (data) {
            if ((!filteredData.length || originalData.length !== data.length) || canRedisplay) {
                console.log("setFilteredData", data, { filteredData, originalData, data })
                setFilteredData(data)
            }
            setOriginalData(data)
        }
    }, [data])

    const handleSearch = (
        selectedKeys: string[],
        dataIndex: DataIndex
    ) => {


        if (selectedKeys.length > 0) {

            notification.info({
                message: `Filtrando por: ${selectedKeys[0]}`,
            })


            setFilteredData(
                data.filter((item) =>
                    //@ts-ignore
                    item[dataIndex].toString().toLowerCase().includes(selectedKeys[0].toLowerCase())
                )
            );
        }
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: T) => record.id === editingKey;

    const cancel = () => {
        setEditingKey("");
    };

    useEffect(() => {

        if (filteredData.length !== data.length) {
            setIsFiltered(true);
        } else {

            const isDifferent = filteredData.some((filteredItem, index) => {
                return filteredItem.id !== data[index].id;
            });

            setIsFiltered(isDifferent);
        }

    }, [filteredData, data]);

    const searchInput = useRef<InputRef>(null);

    const [form] = Form.useForm();

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as T;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };


    const getColumnSearchProps = (
        dataIndex: DataIndex,
        label: string,
    ): TableColumnType<T> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Pesquise por: ${label}`}
                    value={selectedKeys[0]}
                    onChange={(e) => {

                        setSelectedKeys(e.target.value ? [e.target.value] : [])

                        if (e.target.value === '') {
                            setFilteredData(data)
                            handleSearch([] as string[], dataIndex)
                        }


                    }

                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys as string[], dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys as string[], dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 120 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters);
                            handleSearch([] as string[], dataIndex)
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Apagar
                    </Button>
                    <Button
                        type="text"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrar
                    </Button>
                    <Button
                        type="text"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        fechar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                size={20}
                style={{ color: filtered ? colors.primaryPurple : undefined }}
            />
        ),
        onFilter: (value, record) => {
            if (value && value !== undefined) {
                return record[dataIndex]
                    //@ts-ignore
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase())
            }
        }
        ,
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedKeys(data.map(keys => keys.id));
        } else {
            setSelectedKeys([]);
        }
    };


    const handleCheckboxChange = (recordId: React.Key) => {
        setSelectedKeys((prevSelected) => {
            if (prevSelected.includes(recordId)) {
                return prevSelected.filter((id) => id !== recordId);
            } else {
                return [...prevSelected, recordId];
            }
        });
    };

    const rowClassName = (record: T) => {
        return selectedKeys.includes(record.id) ? "selected-row" : "";
    };

    const clearAllFilters = () => {

        setFilteredData(data);

        notification.success({
            message: "Filtros apagados!",
        })
    }

    return {
        cancel,
        editingKey,
        isEditing,
        setEditingKey,
        getColumnSearchProps,
        save,
        form,
        handleSelectAll,
        handleCheckboxChange,
        selectedKeys,
        rowClassName,
        setSelectedKeys,
        filteredData,
        setFilteredData,
        clearAllFilters,
        isFiltered


    };
};