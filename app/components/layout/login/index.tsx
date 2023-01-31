import { Layout } from "antd";
import { LayoutWrapper } from "./styles";
import React from "react";

const { Content } = Layout;

interface LayoutPropsTypes {
  children: JSX.Element;
}

const CustomLayout: React.FC<LayoutPropsTypes> = ({ children }) => {
  return (
    <LayoutWrapper className="h-full">
      <Layout className="site-layout h-full w-full">
        <Content className="content-padding h-full  w-full">{children}</Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default CustomLayout;
