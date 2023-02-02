import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import OrderIcon from "~/assets/icons/OrderIcons";
import BookingIcon from "~/assets/icons/BookingIcon";
import ProductsIcon from "~/assets/icons/ProductsIcon";
import CategoriesIcon from "~/assets/icons/Categories";
import TagsIcon from "~/assets/icons/TagsIcon";
import VariantsIcon from "~/assets/icons/VariantsIcon";
import SettingsIcon from "~/assets/icons/SettingsIcon";

interface NavMenuPropTypes {
  collapsed: boolean;
}
type MenuItem = Required<MenuProps>["items"][number];

const NavMenu: React.FC<NavMenuPropTypes> = (collapsed) => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrent(localStorage.getItem("activeMenu") || "Orders");
    }
  }, []);

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
      <Link to="/orders">Orders</Link>,
      "Orders",
      <div>
        <OrderIcon />
      </div>
    ),
    getItem(
      <Link to="/booking">Bookings</Link>,
      "Booking",
      <div>
        <BookingIcon />
      </div>
    ),
    getItem(
      <Link to="/products">Products</Link>,
      "Products",
      <div>
        <ProductsIcon />
      </div>
    ),
    getItem(
      <Link to="/vendors">Vendors</Link>,
      "Vendors",
      <div>
        <VariantsIcon />
      </div>
    ),
    /*  getItem(
      <Link to="/categories">Categories</Link>,
      "Categories",
      <div>
        <CategoriesIcon />
      </div>
    ),
    getItem(
      <Link to="/tags">Tags</Link>,
      "Tags",
      <div>
        <TagsIcon />
      </div>
    ),
    getItem(
      <Link to="/settings">Settings</Link>,
      "Settings",
      <div>
        <SettingsIcon />
      </div>
    ), */
  ];

  return (
    <Menu
      onClick={(e) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("activeMenu", e.key);
          if (e.key !== "") setCurrent(e.key);
        }
      }}
      selectedKeys={[current]}
      mode="inline"
      theme="light"
      items={items}
    />
  );
};

export default NavMenu;
