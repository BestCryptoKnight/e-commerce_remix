import urqlQuery from "~/graphql/";
import { CreateVariant } from "~/graphql/mutations/variants";
import { GetTags } from "~/graphql/queries/tags";

import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { notification } from "antd";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function CreateVariantAction(data: any) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      data.vendorId = cookies.get("vendorId");
      urqlQuery
        .mutation(CreateVariant, data)
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }

          let stateData = state();
          let newStateData = [
            ...stateData.app.data,
            result?.data?.createVariant,
          ];
          dispatch(requestSuccessUpdateStateData(newStateData));

          notification.success({
            message: "Variant created successfully",
          });
        });
    } catch (error) {
      throw error;
    }
  };
}
