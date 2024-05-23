import { Table } from "@tanstack/react-table";
import { Button, Flex } from "antd"
import {  MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { Text } from "../Text";



interface PaginationProps<T> {
    className?:string;
    table:Table<T>
}


export const Pagination = <T,>({ className, table }: PaginationProps<T>) => {

    const Wrapper = styled.div`

    button {

        &:hover{
            border-color: #C882B7 !important;
            color: #C882B7 !important;
        }
    }
    
    `
    return (
     

        <Wrapper>

            <Flex className={twMerge("my-2",className)} align="center" gap={5}>
                
                <Button disabled={!table.getCanPreviousPage()} size="small" aria-label="first-page" onClick={() => table.firstPage()}>
                    <MdKeyboardDoubleArrowLeft  />
                </Button>
                <Button disabled={!table.getCanPreviousPage()} size="small" aria-label="prev-page" onClick={() => table.previousPage()}>
                     <MdOutlineKeyboardArrowLeft />
                </Button>
                <Button disabled={!table.getCanNextPage()} size="small" aria-label="next-page" onClick={() => table.nextPage()}>
                    <MdOutlineKeyboardArrowRight />
               
                </Button>
                <Button disabled={!table.getCanNextPage()} size="small" aria-label="last-page" onClick={() => table.lastPage()}>
                    <MdKeyboardDoubleArrowRight />
                </Button>
                <Text.Root className=" mx-2 font-[400]">
                    <Text.Content content={`Página ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`} />
                </Text.Root>

            </Flex>

        </Wrapper>

        
    )
}