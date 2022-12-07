import apolloClient from "../../../../GraphQL";
import { GetProducts } from "GraphQL/Queries/Products";
import { Dispatch } from "redux";
import { requestStart, requestSuccess } from "../..";

export function GetProductsAction(categoryId: string, vendorId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      const response = await apolloClient.query({
        query: GetProducts,
        variables: { categoryId, vendorId },
      });

      if (!response || !response.data) {
        throw new Error("Something went wrong");
      }
      dispatch(requestSuccess(response.data.getProducts.list));
    } catch (error) {}
  };
}
