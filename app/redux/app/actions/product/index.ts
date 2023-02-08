import urqlQuery from "~/graphql/";
import { GetAllProducts } from "~/graphql/queries/products";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";

export function GetProductsAction(
  page: number,
  pageSize: number,
  filter: any,
  sortOrder: any
) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetAllProducts, {
          sortOrder,
          pagination: { page, pageSize },
          filter: filter,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            notification.error({
              message: result.error?.message,
            });
            dispatch(requestCompleteDisableLoading());
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
