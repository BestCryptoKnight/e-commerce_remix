import styled from "styled-components";

export const LogoWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  svg {
    display: block;
    max-width: 100%;
  }
`;

export const ParentWrapper = styled.div`
  .ant-layout-sider,
  .ant-layout-sider-has-trigger {
    height: 100vh;
  }
  border-right: 1px solid #f0f0f0;
`;
