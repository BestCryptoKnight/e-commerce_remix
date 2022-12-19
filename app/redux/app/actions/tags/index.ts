import urqlQuery from "~/graphql/";
import { CreateTag, DeleteTag, UpdateTag } from "~/graphql/mutations/tags";
import { GetTags } from "~/graphql/queries/tags";
import moment from "moment";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestCompleteDisableDrawerLoading,
  requestStartInitilizeDrawerLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { notification } from "antd";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export function GetTagsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId = cookies.get("vendorId");
      urqlQuery
        .query(GetTags, {
          vendorId,
          sortOrder: { direction: "desc", field: "createdAt" },
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }
          const data = {
            list: result.data.getTags,
            totalCount: null,
          };
          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function TagAction(
  data: any,
  setTagDrawerOpen: any,
  selectedAction: any,
  form: any
) {
  return async (dispatch: Dispatch, state: any) => {
    try {
      const vendorId = cookies.get("vendorId");
      data.vendorId = vendorId;

      if (data?.workdays?.length > 0) {
        data.workdays = data?.workdays?.map((workday: any) => {
          return {
            day: workday.day,
            from: moment(workday.startTime).format("HH:mm"),
            to: moment(workday.endTime).format("HH:mm"),
          };
        });
      } else {
        return notification.error({
          message: "Please add your workday.",
        });
      }
      dispatch(requestStartInitilizeDrawerLoading());
      urqlQuery
        .mutation(
          selectedAction === "create-tag" ? CreateTag : UpdateTag,
          selectedAction === "create-tag"
            ? {
                ...data,
              }
            : { ...data, id: data.id }
        )
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }

          let stateData = state();

          if (selectedAction === "create-tag") {
            let newStateData = {
              totalCount: null,
              list: [...stateData.app.data.list, result?.data?.createTag],
            };

            dispatch(requestSuccessUpdateStateData(newStateData));
          } else {
            const filteredData = stateData.app.data.filter(
              (tag: any) => tag.id !== data.id
            );
            let newStateData = [result?.data?.updateTag, ...filteredData];
            dispatch(requestSuccessUpdateStateData(newStateData));
          }

          notification.success({
            message:
              selectedAction === "create-tag"
                ? "Tag created successfully"
                : "Tag updated successfully",
          });
          setTagDrawerOpen(false);
          form.resetFields();
          dispatch(requestCompleteDisableDrawerLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

export function DeleteTagsAction(id: string) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    let stateData = state();

    let records = stateData.app.data;
    try {
      urqlQuery
        .mutation(DeleteTag, {
          id,
        })
        .toPromise()
        .then((result) => {
          console.log(result);
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }
          let filteredRecords = records.filter(
            (record: any) => record.id !== id
          );
          dispatch(requestSuccessUpdateStateData(filteredRecords));
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
