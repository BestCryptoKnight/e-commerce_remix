import urqlQuery from "~/graphql/";
import { Signup, VerifyOtp, SendOTP } from "~/graphql/mutations/onboarding";
import { notification } from "antd";
import type { Dispatch } from "redux";
import type { StepOneFormFields, OTPActions } from "~/types/onboarding";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";
import Cookies from "universal-cookie";
//Create a new user
export function CreateUser(data: StepOneFormFields, next: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .mutation(Signup, data)
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            const error: any =
              result.error?.graphQLErrors[0].extensions.response;
            if (error) {
              notification.error({
                message: error.message[0],
              });
            }
            dispatch(requestCompleteDisableLoading());
          }
          const { signup } = result.data;
          if (signup) {
            const cookies = new Cookies();
            cookies.set("accessToken", signup?.accessToken, { path: "/" });
            cookies.set("userInfo", JSON.stringify(signup?.user), {
              path: "/",
            });

            next();
          }

          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

//Send OTP to mobile number
export function SendOTPAction(data: OTPActions, next: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .mutation(SendOTP, data)
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }
          console.log(result);
          window.localStorage.setItem("phone", data.phone);
          next();
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

//Verify OTP
export function VerifyOTPAction(data: OTPActions, next: () => void) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const phone = window.localStorage.getItem("phone");
      if (phone) data.phone = phone;
      urqlQuery
        .mutation(VerifyOtp, data)
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }

          next();
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
