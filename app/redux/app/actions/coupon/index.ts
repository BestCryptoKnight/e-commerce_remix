import { GetCoupons } from "~/graphql/queries/coupons";
import urqlQuery from "~/graphql/";
import {
  requestCompleteDisableLoading,
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../..";
import type { Dispatch } from "redux";
import { CreateCoupon } from "~/graphql/mutations/coupon";
import { notification } from "antd";

export function GetCouponAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      urqlQuery
        .query(GetCoupons, {
          vendorId,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          dispatch(requestSuccessUpdateStateData(result.data.getCoupons));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CouponAction(data: any, setCouponDrawerOpen: any) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      data.vendorId = vendorId;
      urqlQuery
        .mutation(CreateCoupon, {
          ...data,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          let stateData = state();
          let newStateData = [
            result?.data?.createCoupon,
            ...stateData.app.data,
          ];
          dispatch(requestSuccessUpdateStateData(newStateData));

          notification.success({
            message: "Coupon created successfully",
          });
          setCouponDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
