import { useState, useEffect } from "react";
import { Steps, Row, Col } from "antd";
import StepOne from "~/pages/onboarding/step-1";
import OTP from "~/pages/onboarding/step-2/request-otp";
import StepTwo from "~/pages/onboarding/step-3";
import VerifyOTP from "~/pages/onboarding/step-2/verify-otp";
import { OnboardingWrapper } from "./styles";

export default function Onboarding() {
  const { Step } = Steps;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const currentStep = localStorage.getItem("onboarding-step");
    if (currentStep) {
      setCurrent(parseInt(currentStep));
    } else {
      localStorage.setItem("onboarding-step", "0");
    }
  }, []);

  const next = () => {
    localStorage.setItem("onboarding-step", String(current + 1));
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Login details",
      content: <StepOne next={next} />,
      description: "Enter your credentials",
    },
    {
      title: "OTP code",
      content: <OTP next={next} />,
    },
    {
      title: "Verify OTP code",
      content: <VerifyOTP next={next} />,
    },
    {
      title: "Your store link",
      content: <StepTwo />,
    },
  ];

  return (
    <OnboardingWrapper>
      <div className="onboarding-steps-wrapper site-layout w-full md:w-2/5">
        <div className="py-4 text-center">
          <img
            src="https://res.cloudinary.com/ddkwmafbd/image/upload/v1670082446/Anyaa_icon_blue_a076d0026d.png"
            width="80"
            height="auto"
            alt="anyaa white logo"
          />
          <p className="mt-4 text-3xl">{steps[current].title}</p>
        </div>

        <div className="md:px-6">{steps[current].content}</div>
      </div>

      <div className="onboarding-stepper hidden w-3/5 md:block">
        <Steps
          direction="vertical"
          current={current}
          style={{ marginTop: 100 }}
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
      </div>
    </OnboardingWrapper>
  );
}
