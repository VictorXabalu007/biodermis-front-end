import { useState } from "react";


export type UsePaginationProps<T> = {

    data: T[],
    pageSize: number,



}

export const usePagination = <T,>({data,pageSize=5}:UsePaginationProps<T>) => {


    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
   
    const currentItems = data.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(data.length / pageSize);

    const handleFirstPage = () => {
        setCurrentPage(1);
      };
    
    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };
  
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return {
        currentItems,
        handleFirstPage,
        handleLastPage,
        handlePreviousPage,
        handleNextPage,
        currentPage,
        totalPages,
        setCurrentPage
    }



}