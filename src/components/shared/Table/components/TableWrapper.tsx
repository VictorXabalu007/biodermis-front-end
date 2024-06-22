import { Flex, theme } from "antd"
import { FlexProps } from "antd/lib";
import { PropsWithChildren } from "react";





export const TableWrapper = ({children, ...rest}:PropsWithChildren<FlexProps>) => {

    const {
        token: {
            colorBgContainer
        }
    } = theme.useToken();

    return (

        <Flex {...rest} style={{background: colorBgContainer, ...rest.style}} className="flex gap-3 mb-2 flex-col border rounded-md border-gray-neutral-100 p-3">
            {children}
        </Flex>


    )
}