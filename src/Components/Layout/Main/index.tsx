import { Col, Image, Layout, Row } from "antd";
import { LayoutWrapper } from "./styles";
import Sidebar from "Components/Shared/Sidebar";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React, { useState } from "react";
import profile from "Assets/Images/profile.png";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "Components/Shared/LoadingSpinner";

const { Content } = Layout;
const { Header } = Layout;

interface LayoutPropsTypes {
  children: JSX.Element;
}

const CustomLayout: React.FC<LayoutPropsTypes> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }, 2000);
              }}
            >
              Log Out
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <LayoutWrapper>
      <Layout className="layout-container">
        <Sidebar />
        <Layout className="site-layout">
          <Header className="nav-fixed header-bg-color ">
            <Row justify="space-between">
              <Col className="col-adjust"></Col>
              <Col span={4}>
                <div className="user-profile">
                  <Dropdown
                    trigger={["click"]}
                    overlay={menu}
                    placement="bottomRight"
                  >
                    <Typography.Link>
                      <Space>
                        {loading && <LoadingSpinner />}
                        <Image src={profile} preview={false} />
                        <DownOutlined />
                      </Space>
                    </Typography.Link>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Header>
          <Content className="content-padding">{children}</Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

export default CustomLayout;
