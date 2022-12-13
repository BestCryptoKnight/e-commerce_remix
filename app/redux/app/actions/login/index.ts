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
            console.log(cookies.get("accessToken")); // Pacman
            window.localStorage.setItem("accessToken", login?.accessToken);
            window.localStorage.setItem("refreshToken", login?.refreshToken);
            window.localStorage.setItem("userId", login?.user?.id);

            next("/");
          }

          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
