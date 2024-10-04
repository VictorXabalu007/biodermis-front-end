import {  Flex } from "antd"
import { BiCategory } from "react-icons/bi"

import DeleteButton from "../../Button/delete-button"
import Title from "../../Typography/typography-title"



type HeaderProps = {
    onDelete: () => void,
    title:string
}


export const CategoriesCardHeader = ({title,onDelete}:HeaderProps) => {

    return (

        <Flex align="end" className="w-full" justify="space-between" gap={3}>

            <Flex gap={5} align="center">

                <Flex >
                    <Flex className="rounded-md p-1 bg-brand-purple/25">
                        <BiCategory className="text-brand-purple fw-bold"  />
                    </Flex>
                </Flex>


                <Title>
                    {title}
                </Title>


            </Flex>

            <Flex align="center" gap={5}>

            

                <DeleteButton

                    onDelete={onDelete}
                    aria-label="Delete card"
                    size="small"
                />
            


            </Flex>

        </Flex>
    )


}