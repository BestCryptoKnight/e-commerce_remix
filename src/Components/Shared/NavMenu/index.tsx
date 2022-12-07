import React, { useState } from "react";
import { Menu } from "antd";
import { MenuWrapper } from "./styles";
import { useNavigate, Link } from "react-router-dom";
// import MovieSearchIcon from "Assets/Icons/MovieSearchIcon";
import { MenuInfo } from "rc-menu/lib/interface";
import type { MenuProps } from "antd";

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

  const items = [
    getItem(
      <Link to="/">Home</Link>,
      "Home",
      <div
        onClick={() => navigate("/")}
        style={collapsed ? { marginTop: 6 } : { marginTop: 12 }}
      >
        {/* <MovieSearchIcon fill={current === "Home" ? "#ffc704" : "#BDBDBD"} /> */}
      </div>
    ),
  ];

  return (
    <MenuWrapper>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        theme="light"
        items={items}
      />
    </MenuWrapper>
  );
};

export default NavMenu;
