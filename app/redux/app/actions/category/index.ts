import urqlQuery from "~/graphql/";
import { GetCategories } from "~/graphql/queries/categories";
import { CreateCategory } from "~/graphql/mutations/categories";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";

export function GetCategoriesAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      urqlQuery
        .query(GetCategories, {
          vendorId,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          dispatch(requestSuccessUpdateStateData(result.data.getCategories));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CreateCategoryAction(data: any, setCategoryDrawerOpen: any) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      const tagIds = ["638df0b7788c2b789fe57c9c"];
      data.vendorId = vendorId;
      data.tagIds = tagIds;
      urqlQuery
        .mutation(CreateCategory, {
          ...data,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          let stateData = state();

          let newStateData = [
            result?.data?.createCategory,
            ...stateData.app.data,
          ];
          dispatch(requestSuccessUpdateStateData(newStateData));
          notification.success({
            message: "Category created successfully",
          });
          setCategoryDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
