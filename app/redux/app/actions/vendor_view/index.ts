import type { Dispatch } from "redux";
import urqlQuery from "~/graphql/";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { GetVendors } from "~/graphql/queries/vendors";

export function GetVendorViewAction(
  page: number,
  pageSize: number,
  filter: any,
  sortOrder: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetVendors, {
          pagination: { page, pageSize },
          filter,
          sortOrder,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

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
