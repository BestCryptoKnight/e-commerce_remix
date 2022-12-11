import React from "react";
import { Drawer } from "antd";
import type { DrawerPropsTypes } from "./drawer.types";
const App: React.FC<DrawerPropsTypes> = ({
  title,
  size,
  onClose,
  open,
  placement,
  extra,
  width,
  children,
}) => {
  return (
    <>
      <Drawer
        title={title}
        width={width}
        placement={placement ? placement : "right"}
        size={size ? size : "default"}
        onClose={onClose}
        open={open}
        extra={extra}
      >
        {children}
      </Drawer>
    </>
  );
};

export default App;
