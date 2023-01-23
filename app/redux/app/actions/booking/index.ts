/* eslint-disable array-callback-return */
import { CreateCartAction, AddServiceToCartAction } from "../cart";
import type { AppDispatch } from "~/redux/store";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestSuccessUpdateStateData,
} from "../../";
import Cookies from "universal-cookie";
import { GetAllBookings } from "~/graphql/queries/bookings";
import { notification } from "antd";
import { CreateOrderAction } from "../order";
import type { BookingFormFields } from "~/types/booking";
import urqlQuery from "~/graphql/";
import { CreateBooking as CreateBookingGQL } from "~/graphql/mutations/booking";
import type { Dispatch } from "redux";

const cookies = new Cookies();
const vendorId = cookies.get("vendorId");
export function CreateBooking(data: BookingFormFields) {
  return async (dispatch: AppDispatch) => {
    dispatch(requestStartInitilizeLoading());

    try {
      if (data.slots.length == 0) {
        dispatch(requestCompleteDisableLoading());
        return notification.error({
          message: "Please select time slots",
        });
      }
      const { getCustomerCart } = await dispatch(CreateCartAction());
      if (!getCustomerCart) {
        dispatch(requestCompleteDisableLoading());
        return notification.error({
          message: "Unable to create customer cart",
        });
      }
      const genericPayload: any = {};
      genericPayload.productId = data?.productId;
      genericPayload.vendorId = vendorId;
      genericPayload.cartId = getCustomerCart?.id;
      genericPayload.tagId = data?.tagId;
      genericPayload.sku = "sku";
      const addServiceToCartPayload: any = {
        ...genericPayload,
        slots: data?.slots,
      };

      const { addServiceToCart } = await dispatch(
        AddServiceToCartAction(addServiceToCartPayload)
      );

      if (!addServiceToCart) {
        dispatch(requestCompleteDisableLoading());
        return notification.error({
          message: "Unable to add service to cart",
        });
      }
      const createBookingPayload = {
        ...genericPayload,
        status: "PENDING",
        slots: data.slots,
      };

      const { createBooking } = await dispatch(
        CreateBookingAction(createBookingPayload)
      );
      if (!createBooking) {
        dispatch(requestCompleteDisableLoading());
        return notification.error({
          message: "Unable to create booking",
        });
      }
      const orderPayload: any = {
        cartId: getCustomerCart?.id,
        customerInfo: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
        status: "PENDING",
        vendorId: vendorId,
      };
      const { createOrder } = await dispatch(CreateOrderAction(orderPayload));
      if (!createOrder) {
        dispatch(requestCompleteDisableLoading());
        return notification.error({
          message: "Unable to create booking",
        });
      }

      dispatch(requestCompleteDisableLoading());
      notification.success({
        message: "Booking created successfully",
      });
      return createBooking;
    } catch (error) {
      throw error;
    }
  };
}

export function CreateBookingAction(data: any) {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      return urqlQuery
        .mutation(CreateBookingGQL, {
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
