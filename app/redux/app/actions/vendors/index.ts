import urqlQuery from "~/graphql/";
import {
  CreateVendor,
  UpdateVendor,
} from "~/graphql/mutations/vendors/vendors";
import type { NavigateFunction } from "@remix-run/react";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";
import Cookies from "universal-cookie";
const cookies = new Cookies();

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
          dispatch(requestCompleteDisableLoading());
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          cookies.set("vendorId", JSON.stringify(result.data.createVendor.id));
          window.localStorage.removeItem("onboarding-step");
          next("/products");
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

export function UpdateVendorAction(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId = cookies.get("vendorId");
      urqlQuery
        .mutation(UpdateVendor, { ...data, id: vendorId })
        .toPromise()
        .then((result) => {
          dispatch(requestCompleteDisableLoading());
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          notification.success({
            message: "Vendor updated successfully",
          });
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
