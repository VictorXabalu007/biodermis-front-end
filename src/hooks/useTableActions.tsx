
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputRef, Space, TableColumnType } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useRef, useState } from "react";

type UseTableActionsProps<T extends { key: React.Key }> = {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
}

export const useTableActions = <T extends { key: React.Key }>({
    data,
    setData
}: UseTableActionsProps<T>) => {
    type DataIndex = keyof T;

    const [_, setSearchText] = useState("");
    const [__, setSearchedColumn] = useState<DataIndex | "">("");
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };

    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record: T) => record.key === editingKey;

    const cancel = () => {
        setEditingKey("");
    };

    const searchInput = useRef<InputRef>(null);

    const [form] = Form.useForm();

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as T;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
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
        label: string
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
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys as string[], confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys as string[], confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 120 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Apagar
                    </Button>
                    <Button
                        type="link"
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
                        type="link"
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
                style={{ color: filtered ? "#1677ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                //@ts-ignore
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedKeys(data.map(keys => keys.key));
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
      return selectedKeys.includes(record.key) ? "selected-row" : "";
    };

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
        setSelectedKeys
    };
};