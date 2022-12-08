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
    padding-top: 15px;
  }
  .col-adjust {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .header-bg-color {
    background-color: #c0d3ea;
  }
  .user-profile {
    text-align: right;
  }
`;
