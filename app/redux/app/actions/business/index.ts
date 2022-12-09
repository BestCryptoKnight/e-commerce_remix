import urqlQuery from "~/graphql/";
import { UpdateVendor } from "~/graphql/mutations/business";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";

export function UpdateVendorAction(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      let payload: any = {};
      payload.active = data.active || false;
      payload.name = data.name || "";
      payload.bank = {
        accountNumber: data.accountNumber || "",
        bankName: data.bankName || "",
        beneficiary: data.beneficiary || "",
        iban: data.iban || "",
      };
      payload.info = {
        address: data.address || "",
        addressUrl: data.addressUrl || "",
        description: data.description || "",
        description_ar: data.description_ar || "",
        email: data.email || "",
        phone: data.phone || "",
        terms: data.terms || "",
      };
      payload.settings = {
        deliveryMethods: data.deliveryMethods || "",
        paymentMethods: data.paymentMethods || "",
      };
      urqlQuery
        .mutation(UpdateVendor, {
          ...payload,
          id: "63900eb5788c2b789fe57cb3",
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          notification.success({
            message: "Your profile updated successfully",
          });
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
