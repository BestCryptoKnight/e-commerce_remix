import urqlQuery from "~/graphql/";
import { GetProducts } from "~/graphql/queries/products";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
} from "../../";

export function GetProductsAction(categoryId: string, vendorId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetProducts, {
          categoryId,
          vendorId,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          dispatch(requestSuccessUpdateStateData(result.data.getProducts.list));
        });
    } catch (error) {
      throw error;
    }
  };
}
