import {  Flex } from "antd"
import { Heading } from "../../Heading"
import { BiCategory } from "react-icons/bi"

import DeleteButton from "../../Button/delete-button"
import EyeButton from "../../Button/edit-button"



type HeaderProps = {
    onDelete: () => void,
    onView: () => void,
    title:string
}


export const CategoriesCardHeader = ({title,onDelete,onView}:HeaderProps) => {

    return (

        <Flex align="end" className="w-full" justify="space-between" gap={3}>

            <Flex gap={5} align="center">

                <Flex >
                    <Flex className="rounded-md p-1 bg-brand-purple/25">
                        <BiCategory className="text-brand-purple fw-bold"  />
                    </Flex>
                </Flex>


                <Heading.Root>
                    <Heading.Content content={title} />
                </Heading.Root>


            </Flex>

            <Flex align="center" gap={5}>

                
                <EyeButton 
                    onClick={onView}
                />

                <DeleteButton

                    onDelete={onDelete}
                    aria-label="Delete card"
                    size="small"
                />
            


            </Flex>

        </Flex>
    )


}