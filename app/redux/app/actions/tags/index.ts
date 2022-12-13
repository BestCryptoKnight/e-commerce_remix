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

export function GetTagsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      urqlQuery
        .query(GetTags, {
          vendorId,
        })
        .toPromise()
        .then((result) => {
          console.log(result);
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }
          console.log(result);
          dispatch(requestSuccessUpdateStateData(result.data.getTags));
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
    dispatch(requestStartInitilizeDrawerLoading());
    try {
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      data.vendorId = vendorId;

      data.availabilities = data?.availabilities?.map((availability: any) => {
        return {
          days: availability?.days?.map((day: any) =>
            moment.unix(day?.unix).format("MM/DD/YYYY")
          ),
          startTime: moment(availability?.startDate).format("hh:mm"),
          endTime: moment(availability?.endDate).format("hh:mm"),
        };
      });

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
            let newStateData = [...stateData.app.data, result?.data?.createTag];

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
