import styled from "styled-components";

export const LayoutWrapper = styled.div`
  height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  .ant-layout-content {
    background: #ffff;
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

export const HeroImage = styled.div`
  background-image: url("https://res.cloudinary.com/ddkwmafbd/image/upload/v1670586801/IMG_1188_313393afde.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  border-top-left-radius: 50px;
`;
