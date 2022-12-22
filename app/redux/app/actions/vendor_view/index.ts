import type { Dispatch } from "redux";
import urqlQuery from "~/graphql/";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { GetVendorsView } from "~/graphql/queries/vendors";

export function GetVendorViewAction(page: number, pageSize: number) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetVendorsView, {
          pagination: { page, pageSize },
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          console.log("data", result.data);
          const data = {
            // list: [
            //   {
            //     number_products: result.data.getProducts.totalCount,
            //   },
            // ],
            list: result.data.getVendorsView.list,
            totalCount: result.data.getVendorsView.totalCount,
          };

          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}
