import Sider from "antd/es/layout/Sider"
import { Menu } from "../Menu"
import { Logo } from "../../../shared/Logo/logo"
import { useState } from "react";
import { theme } from "antd";



export const S = () => {
    const [_, setCollapsed] = useState(false);
  
    const {
      token: { colorBgContainer, boxShadow },
    } = theme.useToken();
  
    return (
      <Sider
        width={220}
        className="fixed lg:z-auto z-[999]"
        style={{
          background: colorBgContainer,
          boxShadow: boxShadow,
          minHeight: "100vh",
          overflowY: "scroll",
        }}
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        onCollapse={setCollapsed} 
      >
        <Logo />
        <Menu />
      </Sider>
    );
  };