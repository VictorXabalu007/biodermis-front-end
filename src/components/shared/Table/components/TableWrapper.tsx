import { theme } from "antd"





export const TableWrapper = ({children}:{children:React.ReactNode}) => {

    const {
        token: {
            colorBgContainer
        }
    } = theme.useToken();

    return (

        <div style={{background: colorBgContainer}} className="flex gap-3 mb-2 flex-col border rounded-md border-gray-neutral-100 p-3">
            {children}
        </div>


    )
}