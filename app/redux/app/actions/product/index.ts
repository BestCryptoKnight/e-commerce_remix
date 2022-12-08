import urqlQuery from "../../../../graphql/";
import { GetProducts } from "../../../../graphql/queries/products";
import type { Dispatch } from "redux";
import { requestStart, requestSuccess } from "../../";

export function GetProductsAction(categoryId: string, vendorId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStart());
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
          dispatch(requestSuccess(result.data.getProducts.list));
        });
    } catch (error) {
      throw error;
    }
  };
}
