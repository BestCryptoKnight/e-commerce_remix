import urqlQuery from "~/graphql/";
import { notification } from "antd";
import { GetCustomerCart } from "~/graphql/queries/cart";
import { AddServiceToCart } from "~/graphql/mutations/cart";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
} from "../../";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export function CreateCartAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      const vendorId = cookies.get("vendorId");
      return urqlQuery
        .query(GetCustomerCart, {
          customerId: vendorId,
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
          return result.data;
        });
    } catch (error) {
      throw error;
    }
  };
}

export function AddServiceToCartAction(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      return urqlQuery
        .mutation(AddServiceToCart, {
          ...data,
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
          return result.data;
        });
    } catch (error) {
      throw error;
    }
  };
}
