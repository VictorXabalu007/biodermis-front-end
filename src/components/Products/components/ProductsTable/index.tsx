import { TableColumnsType } from "antd";
import { DataType, productsData } from "./util/productsData";
import { Table } from "../../../shared/Table";
import { NumericFormatter } from "../../../shared/Formatter/NumericFormatter";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { ProductDescription } from "./components/ProductDescription";

export const ProductsTable = () => {

    const [expandedRowKey, setExpandedRowKey] = useState<string | undefined>(undefined);

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            key: 'productImage',
            dataIndex: 'productImage',
            render: () => (
                <div className="flex items-center">
                    <div className="bg-gray-neutral-200 p-3 rounded-md"></div>
                </div>
            )
        },
        {
            title: 'SKU',
            key: 'SKU',
            dataIndex: 'SKU',
            render: (sku) => <p>{sku}</p>
        },
        {
            title: 'Nome do produto',
            key: 'productName',
            dataIndex: 'productName',
            render: (name) => <p>{name}</p>
        },
        {
            title: 'Preço',
            key: 'price',
            dataIndex: 'price',
            render: (price) => <NumericFormatter value={price} />
        },
        {
            title: 'Estoque',
            key: 'stock',
            dataIndex: 'stock',
            render: (stock) => <p>{stock}</p>
        },
        {
            title: 'Total vendidos',
            key: 'totalSold',
            dataIndex: 'totalSold',
            width: 100,
            render: (total) => <p>{total}</p>
        },
        {
            title: <p className="text-center">Ver mais</p>,
            key: 'viewMore',
            dataIndex: 'viewMore',
            render: (_, record) => {
                return (
                    <div>
                        <p>{record.viewMore}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            {expandedRowKey === record.key ? (

                                <div className="border border-purple-solid-500 p-1 p-1 text-purple-solid-500 rounded-md cursor-pointer">
                                    <IoIosArrowUp onClick={() => setExpandedRowKey(undefined)} />
                                </div>
                            
                            ) : (

                                <div className="border border-purple-solid-500 p-1 text-purple-solid-500 rounded-md cursor-pointer">
                                    <IoIosArrowDown onClick={() => setExpandedRowKey(record.key)} />
                                </div>
                            )}

                        </div>
                    </div>
                );
            },
       
        },
    ];

    return (

        <Table

            data={productsData}
            columns={columns}
            className="cursor-pointer"
            expandable={{
                expandIconColumnIndex: -1,
                expandRowByClick: true,
                rowExpandable: () => true,
                expandedRowRender: (record) => <ProductDescription {...record} />,
                expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
                onExpand: (expanded, record) => {
                    setExpandedRowKey(expanded ? record.key : undefined);
                },
                
            }}
            
        />

    );

};
