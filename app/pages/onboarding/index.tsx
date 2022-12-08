import { useState } from "react";
import { Steps, Row, Col } from "antd";
import StepOne from "~/pages/onboarding/steps/StepOne";
import OTP from "~/pages/onboarding/otp/OTP";
import StepTwo from "~/pages/onboarding/steps/StepTwo";
import VerifyOTP from "~/pages/onboarding/otp/VerifyOTP";
import { OnboardingWrapper } from "./styles";

export default function Onboarding() {
  const { Step } = Steps;

  const [current, setCurrent] = useState(3);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Login details",
      content: <StepOne next={next} />,
      description: "This will be your login credentials for the store portal.",
    },
    {
      title: "OTP code",
      content: <OTP next={next} />,
      description: "Please enter your mobile number to receive OTP code",
    },
    {
      title: "Verify OTP code",
      content: <VerifyOTP next={next} />,
      description: "Enter OTP code for verification",
    },
    {
      title: "Your store link",
      content: <StepTwo />,
      description: "this is a description",
    },
    // {
    //   title: 'Business details',
    //   content: <StepThree />,
    //   description: 'this is a description'
    // }
  ];

  //const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <OnboardingWrapper>
      <Row>
        <Col sm={24} md={6}>
          <div className="onboarding-stepper ">
            <img
              src="https://res.cloudinary.com/ddkwmafbd/image/upload/f_auto,c_limit,w_640,q_auto/v1655462151/full_logo_white_1_153aea68a4.png"
              width="150"
              height="auto"
              alt="anyaa white logo"
            />

            <Steps
              direction="vertical"
              current={current}
              style={{ marginTop: 80 }}
            >
              {steps.map((item, i) => {
                return (
                  <Step
                    key={i}
                    title={item?.title}
                    description={item?.description}
                  />
                );
              })}
            </Steps>

            <a href="mailto:support@anyaa.io?subject = Onboarding Issue&body = Message">
              support@anyaa.io{" "}
            </a>
          </div>
        </Col>
        <Col sm={24} md={14}>
          <div className="onboarding-steps-wrapper">
            <div>
              <img
                src="https://res.cloudinary.com/ddkwmafbd/image/upload/v1670082446/Anyaa_icon_blue_a076d0026d.png"
                width="60"
                height="auto"
                alt="anyaa white logo"
              />
              <h1 className="onboarding-title">{steps[current].title}</h1>
              {/* <p className="onboarding-stepDesc">
                {steps[current].description}
              </p> */}
            </div>

            <div>
              <div>{steps[current].content}</div>
            </div>
          </div>
        </Col>
      </Row>
    </OnboardingWrapper>
  );
}
