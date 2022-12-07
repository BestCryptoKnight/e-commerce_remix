import { useState } from "react";
import { Layout, Image } from "antd";
import { useNavigate } from "react-router-dom";
import NavMenu from "../NavMenu/index";
import { LogoWrapper, ParentWrapper } from "./styles";
import AnyaaLogo from "Assets/Logos/Anyaa_logo.png";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
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
            <div style={{ width: 70 }}>
              <Image src={AnyaaLogo} width={70} preview={false} />
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
