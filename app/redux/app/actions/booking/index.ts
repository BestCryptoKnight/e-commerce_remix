/* eslint-disable array-callback-return */
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestSuccessUpdateStateData,
} from "../../";
import { GetAllBookings } from "~/graphql/queries/bookings";
import { notification } from "antd";

import urqlQuery from "~/graphql/";
import type { Dispatch } from "redux";

export function GetBookingsAction(page: number, pageSize: number) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetAllBookings, {
          sortOrder: { direction: "desc", field: "createdAt" },
          pagination: { page, pageSize },
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            notification.error({
              message: result?.error?.message,
            });
            dispatch(requestCompleteDisableLoading());
            throw new Error("Something went wrong");
          }
          console.log("-----", result);
          const data = {
            list: result.data.getAllBookings.list,
            totalCount: result.data.getAllBookings.totalCount,
          };
          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}
