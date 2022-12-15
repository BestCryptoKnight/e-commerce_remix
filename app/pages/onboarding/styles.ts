import styled from "styled-components";

export const OnboardingWrapper = styled.div`
  height: 100%;
  background: #ffffff;
  display: flex;

  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title,
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #fff;
  }

  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description,
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: #fff5;
  }

  .ant-input:placeholder-shown {
    font-size: 16px;
  }
  .ant-input {
    padding: 8px !important;
  }
  a,
  area,
  button,
  [role="button"],
  input:not([type="range"]),
  label,
  select,
  summary,
  textarea {
    font-size: 16px;
  }

  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #153774;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: #153774;
  }
  .onboarding-wrapper {
    display: flex;
    align-items: center;
  }
  .ant-steps-item-container {
    padding-bottom: 80px;
  }
  .ant-row {
    justify-content: space-between;
  }

  .onboarding-stepper {
    height: 100vh;
    padding: 50px 40px;
    padding-top: 100px;
    background-image: url("https://res.cloudinary.com/ddkwmafbd/image/upload/v1671056248/IMG_1187_a22de59325.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    border-top-left-radius: 200px;
  }

  .onboarding-steps-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
  }
`;
