import urqlQuery from "~/graphql/";
import { CreateVariant } from "~/graphql/mutations/variants";
import { GetVariants } from "~/graphql/queries/variants";

import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestSuccessUpdateStateData,
  requestStartInitilizeDrawerLoading,
  requestCompleteDisableDrawerLoading,
} from "../../";
import { notification } from "antd";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function GetVariantsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId = cookies.get("vendorId");
      urqlQuery
        .query(GetVariants, {
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
          dispatch(requestSuccessUpdateStateData(result.data.getVariants));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CreateVariantAction(data: any, setVariantDrawerOpen: any) {
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
          setVariantDrawerOpen(false);
          notification.success({
            message: "Variant created successfully",
          });
        });
    } catch (error) {
      throw error;
    }
  };
}
