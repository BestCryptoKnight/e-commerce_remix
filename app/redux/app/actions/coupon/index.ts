import { GetCoupons } from "~/graphql/queries/coupons";
import urqlQuery from "~/graphql/";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../..";
import type { Dispatch } from "redux";

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
