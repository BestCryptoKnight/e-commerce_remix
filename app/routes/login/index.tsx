import { useState } from "react";
import Layout from "~/components/layout/login";
import EmailLogin from "~/pages/login/email-login";
import PhoneLogin from "~/pages/login/otp-login";

export default function Login() {
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  return (
    <Layout>
      <div className="m-auto flex w-full flex-col items-center justify-center">
        <img
          width="60"
          src="https://res.cloudinary.com/ddkwmafbd/image/upload/v1670590779/Anyaa_icon_blue_c68807d4b0.png"
          alt="anyaa blue logo"
        />
        <h1 className="text-3xl">Welcome back</h1>

        {showPhoneForm ? (
          <>
            <div
              onClick={() => setShowPhoneForm(false)}
              className="mb-10 w-full"
            >
              <p className="cursor-pointer text-center">
                want to signin using your email?{" "}
                <span className="underline">click here</span>
              </p>
            </div>
            <PhoneLogin />
          </>
        ) : (
          <>
            <div onClick={() => setShowPhoneForm(true)} className="w-full">
              <p className="mb-10 cursor-pointer text-center">
                want to signin using your phone?{" "}
                <span className="underline">click here</span>
              </p>
            </div>
            <EmailLogin />
          </>
        )}
      </div>
    </Layout>
  );
}
