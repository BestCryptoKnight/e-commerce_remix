import urqlQuery from "~/graphql/";
import { Login } from "~/graphql/mutations/login";
import { notification } from "antd";
import type { Dispatch } from "redux";
import type { NavigateFunction } from "@remix-run/react";
import type { EmailLoginForm } from "~/types/login";
import Cookies from "universal-cookie";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";

//Login existing user
export function LoginUser(data: EmailLoginForm, next: NavigateFunction) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .mutation(Login, data)
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
          const { login } = result.data;
          if (login) {
            const cookies = new Cookies();
            cookies.set("accessToken", login?.accessToken, { path: "/" });
            cookies.set("userInfo", JSON.stringify(login?.user), { path: "/" });
            cookies.set("vendorId", JSON.stringify(login?.user?.vendor?.id), {
              path: "/",
            });

            next("/products");
          }

          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
