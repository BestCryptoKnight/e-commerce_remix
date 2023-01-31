import type { Dispatch } from "redux";
import urqlQuery from "~/graphql/";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { GetVendors } from "~/graphql/queries/vendors";

export function GetVendorViewAction(page: number, pageSize: number) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetVendors, {
          pagination: { page, pageSize },
          filter: {},
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          console.log("data", result.data);
          const data = {
            list: result.data.getVendorsForHub.list,
            totalCount: result.data.getVendorsForHub.totalCount,
          };

          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}
