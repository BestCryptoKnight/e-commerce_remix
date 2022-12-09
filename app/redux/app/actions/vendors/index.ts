import urqlQuery from "~/graphql/";
import { CreateVendor } from "~/graphql/mutations/vendors/vendors";
import type { NavigateFunction } from "@remix-run/react";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";

//Verify OTP
export function CreateVendorAction(data: any, next: NavigateFunction) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const phone = window.localStorage.getItem("phone");
      if (phone) data.phone = phone;
      urqlQuery
        .mutation(CreateVendor, data)
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          next("/");
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
