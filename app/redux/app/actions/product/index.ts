import urqlQuery from "~/graphql/";
import { GetAllProducts } from "~/graphql/queries/products";
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
import Cookies from "universal-cookie";
import slugify from "slugify";
const cookies = new Cookies();

export function GetProductsAction(page: number, pageSize: number, filter: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetAllProducts, {
          sortOrder: { direction: "desc", field: "createdAt" },
          pagination: { page, pageSize },
          filter: filter,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          const data = {
            list: result.data.getProductsForHub.list,
            totalCount: result.data.getProductsForHub.totalCount,
          };
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
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }

          let stateData = state();

          if (selectedAction === "new-product") {
            let newStateData = {
              totalCount: totalCount + 1,
              list: [...stateData.app.data.list, result?.data?.createProduct],
            };

            dispatch(requestSuccessUpdateStateData(newStateData));
          } else {
            const filteredData = stateData.app.data.list.filter(
              (product: any) => product.id !== id
            );

            let newStateData = {
              totalCount: stateData?.app?.data?.totalCount,
              list: [result?.data?.updateProduct, ...filteredData],
            };
            dispatch(requestSuccessUpdateStateData(newStateData));
          }

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

    let records = stateData.app.data.list;
    let totalCount = stateData.app.data.totalCount;

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

          let newStateData = {
            totalCount: totalCount - 1,
            list: filteredRecords,
          };

          notification.success({
            message: "Product deleted successfully",
          });
          dispatch(requestSuccessUpdateStateData(newStateData));
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
