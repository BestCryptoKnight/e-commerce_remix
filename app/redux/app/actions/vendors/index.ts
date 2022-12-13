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

          next("/");
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
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
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
