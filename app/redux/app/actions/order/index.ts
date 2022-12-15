import urqlQuery from "~/graphql/";
import { GetOrders, GetOrder } from "~/graphql/queries/orders";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";

type CustomerInfoType = {
  firstName: string;
  lastName: string;
};

type CartType = {
  finalPrice: number;
};

type RowDataType = {
  id: string;
  status: string;
  cart: CartType;
  customerInfo: CustomerInfoType;
  paymentMethod: string;
  deliveryMethod: string;
};

export function GetOrdersAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    console.log("passing2");
    try {
      console.log("dd33d");
      const vendorId =
        localStorage.getItem("vendorId") || "63900eb5788c2b789fe57cb3";
      console.log("JJJJJJ");
      urqlQuery
        .query(GetOrders, {
          vendorId,
        })
        .toPromise()
        .then((result) => {
          console.log("ddd", result);
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          const items = result.data.getOrders;

          const data = items?.map((item: RowDataType) => ({
            customer: `${item?.customerInfo?.firstName} ${item?.customerInfo?.lastName} `,
            payment: item?.paymentMethod,
            delivery: item?.deliveryMethod,
            total: item?.cart?.finalPrice,
            ...item,
          }));

          console.log("data", data);

          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}

// export function GetOrderAction(id: string) {
//   return async (dispatch: Dispatch) => {
//     dispatch(requestStartInitilizeLoading());
//     try {
//       urqlQuery
//         .query(GetOrder, {
//           id,
//         })
//         .toPromise()
//         .then((result) => {
//           if (!result || !result.data) {
//             throw new Error("Something went wrong");
//           }

//           const items = result.data.getOrder;

//           dispatch(requestSuccessUpdateStateData(items));
//         });
//     } catch (error) {
//       throw error;
//     }
//   };
// }
