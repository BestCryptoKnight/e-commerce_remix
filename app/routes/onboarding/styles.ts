import styled from "styled-components";
export const OnboardingWrapper = styled.div`
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
  .onboarding-wrapper {
    display: flex;
    align-items: center;
  }
  .ant-steps-item-container {
    padding-bottom: 40px;
  }

  .onboarding-stepper {
    height: 100vh;
    padding: 50px 40px;
    padding-top: 100px;
    background-color: #24468b;
  }

  .onboarding-steps-wrapper {
    padding: 40px;
  }
`;
