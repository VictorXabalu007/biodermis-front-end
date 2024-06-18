import { Button, Flex } from "antd"
import { Heading } from "../../Heading"
import { BiCategory } from "react-icons/bi"
import { FaTrash } from "react-icons/fa6"
import { ButtonWrapper } from "../../../Products/style/styles"



type HeaderProps = {
    onDelete: () => void,
    title:string
}


export const CategoriesCardHeader = ({title,onDelete}:HeaderProps) => {


    return (

        <Flex className="w-full" justify="space-between" gap={3}>

            <Flex vertical>

                <Flex >
                    <Flex className="rounded-md p-1 bg-brand-purple/25">
                        <BiCategory className="text-brand-purple fw-bold"  />
                    </Flex>
                </Flex>


                <Heading.Root>
                    <Heading.Content content={title} />
                </Heading.Root>


            </Flex>

            <Flex>

            <ButtonWrapper>

                <Button

                    onClick={onDelete}
                    aria-label="Delete card"
                    icon={<FaTrash style={{fontSize: 10}} />}
                    className="delete-btn bg-brand-purple"
                    size="small"
                    />


            </ButtonWrapper>


            </Flex>

        </Flex>
    )


}