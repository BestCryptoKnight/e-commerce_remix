import { Layout } from "antd";
import { LayoutWrapper, HeroImage } from "./styles";
import React from "react";

const { Content } = Layout;

interface LayoutPropsTypes {
  children: JSX.Element;
}

const CustomLayout: React.FC<LayoutPropsTypes> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Layout className="site-layout w-2/5">
        <Content className="content-padding mt-36 w-full">{children}</Content>
      </Layout>
      <Layout className="w-3/5">
        <HeroImage />
      </Layout>
    </LayoutWrapper>
  );
};

export default CustomLayout;
