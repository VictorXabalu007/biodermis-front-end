import { Pagination } from "antd";
import { PaginationProps } from "antd/lib";

type Props = {
    onPageChange: (page: number) => void;
    totalItems: number; 
    currentPage: number; 
    pageSize?: number; 
} & PaginationProps

export const ContainerPagination = ({
    onPageChange,
    totalItems,
    currentPage,
    pageSize = 10, 
    ...rest
}: Props) => {

    return (
        <Pagination
            current={currentPage} 
            total={totalItems} 
            pageSize={pageSize} 
            onChange={onPageChange}
            showSizeChanger={false} 
            {...rest}
        />
    );

};
