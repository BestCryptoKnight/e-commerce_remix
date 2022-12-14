import urqlQuery from "~/graphql/";
import { GetCategories } from "~/graphql/queries/categories";
import {
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} from "~/graphql/mutations/categories";
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

          //change to backend sort once implemented
          const items = [...result.data.getCategories];

          const sortedItems = items.sort(
            (a: { createdAt: Date }, b: { createdAt: Date }) => {
              const aCreatedAt = new Date(a.createdAt);
              const bCreatedAt = new Date(b.createdAt);

              if (aCreatedAt > bCreatedAt) {
                return -1;
              }
              if (bCreatedAt < aCreatedAt) {
                return 1;
              }
              return 0;
            }
          );

          dispatch(requestSuccessUpdateStateData(sortedItems));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CategoryAction(
  data: any,
  setCategoryDrawerOpen: any,
  selectedAction: string,
  id: string
) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      const tagIds = ["638df0b7788c2b789fe57c9c"];
      data.vendorId = vendorId;
      data.tagIds = tagIds;
      urqlQuery
        .mutation(
          selectedAction === "new-category" ? CreateCategory : UpdateCategory,
          selectedAction === "new-category"
            ? {
                ...data,
              }
            : {
                ...data,
                id,
              }
        )
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          let stateData = state();

          if (selectedAction === "new-category") {
            let newStateData = [
              result?.data?.createCategory,
              ...stateData.app.data,
            ];
            dispatch(requestSuccessUpdateStateData(newStateData));
          } else {
            const filteredData = stateData.app.data.filter(
              (category: any) => category.id !== data.id
            );
            let newStateData = [result?.data?.updateCategory, ...filteredData];
            dispatch(requestSuccessUpdateStateData(newStateData));
          }

          notification.success({
            message:
              selectedAction === "new-category"
                ? "Category created successfully"
                : "Category updated successfully",
          });
          setCategoryDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

export function DeleteCategoryAction(id: string) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    let stateData = state();

    let records = stateData.app.data;
    try {
      urqlQuery
        .mutation(DeleteCategory, {
          id,
        })
        .toPromise()
        .then((result) => {
          console.log(result);
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          let filteredRecords = records.filter(
            (record: any) => record.id !== id
          );

          notification.success({
            message: "Category deleted successfully",
          });
          dispatch(requestSuccessUpdateStateData(filteredRecords));
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
