import React, { useState } from "react";
import { Menu } from "antd";

import { useNavigate, Link } from "react-router-dom";
import type { MenuInfo } from "rc-menu/lib/interface";
import type { MenuProps } from "antd";
import { HomeFilled } from "@ant-design/icons";

interface NavMenuPropTypes {
  collapsed: boolean;
}
type MenuItem = Required<MenuProps>["items"][number];

const NavMenu: React.FC<NavMenuPropTypes> = (collapsed) => {
  const [current, setCurrent] = useState("Home");

  const navigate = useNavigate();
  const onClick = (e: MenuInfo) => {
    setCurrent(e.key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [getItem(<Link to="/">Home</Link>, "Home", <HomeFilled />)];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      theme="light"
      items={items}
    />
  );
};

export default NavMenu;
