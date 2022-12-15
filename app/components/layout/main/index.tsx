import { Col, Image, Layout, Row } from "antd";
import { LayoutWrapper } from "./styles";
import Sidebar from "~/components/shared/sidebar";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React, { useState } from "react";
import profile from "~/assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "~/components/shared/loading-spinner";
import Cookies from "universal-cookie";
const { Content } = Layout;
const { Header } = Layout;

interface LayoutPropsTypes {
  children: JSX.Element;
}

const CustomLayout: React.FC<LayoutPropsTypes> = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

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
                cookies.remove("accessToken");
                setLoading(true);
                setTimeout(() => {
                  localStorage.removeItem("activeMenu");
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
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="site-layout">
          <Header className="nav-fixed header-bg-color">
            <Row justify="space-between" align="middle">
              {collapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  />
                </svg>
              )}

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
          <Content className="content-padding main-bg-color">
            {children}
          </Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

export default CustomLayout;
