import { useState } from "react";
import { Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
import NavMenu from "../nav-menu/index";
import { LogoWrapper, ParentWrapper } from "./styles";
import AnyaaLogo from "~/assets/logos/Anyaa_logo.png";

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }: any) => {
  const navigate = useNavigate();

  return (
    <ParentWrapper>
      <Sider
        collapsible
        width={250}
        collapsedWidth={80}
        collapsed={collapsed}
        onCollapse={(c) => setCollapsed(c)}
        theme="light"
      >
        <LogoWrapper onClick={() => navigate("/")}>
          {collapsed ? (
            <div>
              <Image
                src="https://res.cloudinary.com/ddkwmafbd/image/upload/v1670590779/Anyaa_icon_blue_c68807d4b0.png"
                width={30}
                preview={false}
              />
            </div>
          ) : (
            <Image src={AnyaaLogo} width={190} preview={false} />
          )}
        </LogoWrapper>

        <NavMenu collapsed={collapsed} />
      </Sider>
    </ParentWrapper>
  );
};

export default Sidebar;
