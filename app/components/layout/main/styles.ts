import styled from "styled-components";

export const LayoutWrapper = styled.div`
  height: 100%;
  background: #ffffff;
  .ant-layout-content {
    background: #ffff;
  }
  .ant-layout-sider-light .ant-layout-sider-trigger {
    left: 0;
    border-right: 1px solid #f0f0f0;
  }
  .ant-layout {
    background: #ffff;
  }
  .content-padding {
    padding: 40px;
    padding-top: 40px;
    padding-bottom: 0;
  }
  .col-adjust {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .header-bg-color {
    background-color: #fff;
    border-bottom: solid #dbdadd 1px;
  }
  .main-bg-color {
    background-color: #f5f5f5;
  }
  .user-profile {
    text-align: right;
  }
  .ant-layout-header {
    padding: 0 50px 0 10px !important;
  }
  .ant-dropdown-menu-item .ant-dropdown-menu-submenu-expand-icon,
  .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-expand-icon {
    position: static;
  }
`;

//f5f5f5
