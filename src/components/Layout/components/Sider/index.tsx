import Sider from "antd/es/layout/Sider"
import { Menu } from "../Menu"
import { Logo } from "../../../shared/Logo"
import { useState } from "react";
import { BORDER_GRAY } from "../../../../constants/classnames/classnames";
import { theme } from "antd";



export const S = () => {

    const [collapsed,setCollapsed] = useState(false);

    const {

        token: { colorBgContainer },
    
      } = theme.useToken();

    return (

        <Sider
        width={240}
        
        style={{ background: colorBgContainer , borderRight: BORDER_GRAY}}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={setCollapsed}
        >

        <Logo />

        <Menu />

      </Sider>

    )

}