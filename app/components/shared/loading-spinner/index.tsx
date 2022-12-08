import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SpinnerWrapper } from "./styles";

const AntIcon = (
  <SpinnerWrapper>
    <LoadingOutlined spin />
  </SpinnerWrapper>
);

const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <Spin indicator={AntIcon} />
  </div>
);

export default LoadingSpinner;
