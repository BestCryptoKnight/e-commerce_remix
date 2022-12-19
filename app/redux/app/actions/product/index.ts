import urqlQuery from "~/graphql/";
import { GetProducts } from "~/graphql/queries/products";
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "~/graphql/mutations/products";
import type { Dispatch } from "redux";

import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";
import { UploadFile } from "~/graphql/mutations/utils";
import Cookies from "universal-cookie";
import slugify from "slugify";
const cookies = new Cookies();

export function GetProductsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId = cookies.get("vendorId");
      urqlQuery
        .query(GetProducts, {
          vendorId,
          sortOrder: { direction: 'desc', field: "createdAt" },
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          const data = {
            list: result.data.getProducts.list,
            totalCount: result.data.getProducts.totalCount,
          };

          console.log("result", result);
          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function ProductsAction(
  data: any,
  setProductDrawerOpen: any,
  selectedAction: string,
  id: string,
  totalCount: number
) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      data.vendorId = cookies.get("vendorId");
      data.image =
        "https://upload.travelawaits.com/ta/uploads/2021/04/7869b2f6d8e68e89909201dfcc4c67869b2.jpg"; // Will be removed
      const suggestedSlug = slugify(data.title, {
        replacement: "-",
        remove: /[^\w\s]/gi,
      })
        .replace(/'_+/g, "")
        .toLowerCase();
      data.slug = suggestedSlug;

      console.log("HEREEEE");

      urqlQuery
        .mutation(
          selectedAction === "new-product" ? CreateProduct : UpdateProduct,
          selectedAction === "new-product"
            ? {
                ...data,
              }
            : {
                ...data,
                id: id,
              }
        )
        .toPromise()
        .then((result) => {
          console.log("RESULT", result);
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }

          console.log("this line right here..");

          let stateData = state();

          console.log("stateData", stateData);

          if (selectedAction === "new-product") {
            // console.log("are you passing here??", ...stateData.app.data);

            // const { price, sku, ...dataRest } = data;
            // const prevList =

            console.log("totalCount", totalCount);
            console.log("newww", stateData, result);
            let newStateData = {
              totalCount: totalCount + 1,
              list: [...stateData.app.data.list, result?.data?.createProduct],
            };

            console.log("1", newStateData);
            dispatch(requestSuccessUpdateStateData(newStateData));
          } else {
            const filteredData = stateData.app.data.filter(
              (product: any) => product.id !== id
            );

            let newStateData = [result?.data?.updateProduct, ...filteredData];
            dispatch(requestSuccessUpdateStateData(newStateData));
          }

          console.log("success???");

          notification.success({
            message:
              selectedAction === "new-product"
                ? "Product created successfully"
                : "Product updated successfully",
          });
          setProductDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

export function DeleteProductAction(id: string) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    let stateData = state();

    let records = stateData.app.data;
    try {
      urqlQuery
        .mutation(DeleteProduct, {
          id,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          let filteredRecords = records.filter(
            (record: any) => record.id !== id
          );

          notification.success({
            message: "Product deleted successfully",
          });
          dispatch(requestSuccessUpdateStateData(filteredRecords));
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

