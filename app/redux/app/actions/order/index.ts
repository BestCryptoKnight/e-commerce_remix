import urqlQuery from "~/graphql/";
import { GetOrders, GetOrder } from "~/graphql/queries/orders";
import { CreateOrder } from "~/graphql/mutations/order";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";
import Cookies from "universal-cookie";
import type { RowDataType } from "~/types/orders";
const cookies = new Cookies();

export function GetOrdersAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    console.log("passing2");
    try {
      const vendorId = cookies.get("vendorId");
      urqlQuery
        .query(GetOrders, {
          vendorId,
          sortOrder: { direction: "desc", field: "createdAt" },
        })
        .toPromise()
        .then((result) => {
          console.log("ddd", result);
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          const items = result.data.getOrders;

          const formattedData = items?.map((item: RowDataType) => ({
            customer: `${item?.customerInfo?.firstName} ${item?.customerInfo?.lastName} `,
            payment: item?.paymentMethod,
            delivery: item?.deliveryMethod,
            total: item?.cart?.finalPrice,
            orderVId: item?.orderId,
            ...item,
          }));

          const data = {
            list: formattedData,
            totalCount: null,
          };

          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CreateOrderAction(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      return urqlQuery
        .mutation(CreateOrder, {
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
