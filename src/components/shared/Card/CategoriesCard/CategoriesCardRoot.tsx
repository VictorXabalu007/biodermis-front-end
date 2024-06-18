import { Flex, theme } from "antd";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type FlexProps = React.ComponentProps<typeof Flex>;


export const CategoriesCardRoot = ({children,className,...rest}:PropsWithChildren<FlexProps>) => {

    const {token:{colorBgContainer}} =theme.useToken();

    return (
        <Flex
         vertical
         gap={10}
         className={twMerge("hover:shadow hover:cursor-pointer",className)}
         {...rest} style={{
            background: colorBgContainer,
            borderRadius: '5px',
            padding: '1rem',
            border: '1px solid #EFEFEF',
            minWidth: '250px',
            flex: 1
        }}>

            {children}


        </Flex>
    )

}