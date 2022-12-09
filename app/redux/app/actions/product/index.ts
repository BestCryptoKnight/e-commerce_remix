import urqlQuery from "~/graphql/";
import { GetProducts } from "~/graphql/queries/products";
import { CreateProduct } from "~/graphql/mutations/products";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";

export function GetProductsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      urqlQuery
        .query(GetProducts, {
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

export function AddProductsAction(data: any, setProductDrawerOpen: any) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      data.vendorId = vendorId;
      data.image = "new image";
      urqlQuery
        .mutation(CreateProduct, {
          ...data,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          let stateData = state();

          let newStateData = [
            result?.data?.createProduct,
            ...stateData.app.data,
          ];
          dispatch(requestSuccessUpdateStateData(newStateData));
          notification.success({
            message: "Product created successfully",
          });
          setProductDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
