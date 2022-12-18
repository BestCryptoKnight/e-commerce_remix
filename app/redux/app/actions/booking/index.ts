import { CreateCartAction, AddServiceToCartAction } from "../cart";
import type { AppDispatch } from "~/redux/store";
import {
  requestStartInitilizeLoading,
  requestCompleteDisableLoading,
  requestSuccessUpdateStateData,
} from "../../";
import Cookies from "universal-cookie";
import { GetBookings } from "~/graphql/queries/bookings";
import { notification } from "antd";
import { CreateOrderAction } from "../order";
import type { BookingFormFields } from "~/types/booking";
import moment from "moment";
import urqlQuery from "~/graphql/";
import { CreateBooking as CreateBookingGQL } from "~/graphql/mutations/booking";
import type { Dispatch } from "redux";

const cookies = new Cookies();
const vendorId = cookies.get("vendorId");
export function CreateBooking(data: BookingFormFields) {
  return async (dispatch: AppDispatch) => {
    dispatch(requestStartInitilizeLoading());

    try {
      const { getCustomerCart } = await dispatch(CreateCartAction());

      if (!getCustomerCart) {
        return notification.error({
          message: "Unable to create customer cart",
        });
      }

      const genericPayload: any = {};
      genericPayload.productId = data?.productId;
      genericPayload.vendorId = vendorId;
      genericPayload.cartId = getCustomerCart?.id;
      genericPayload.tagId = data?.tagId;

      const addServiceToCartPayload: any = {
        ...genericPayload,
        slots: [
          {
            date: moment(data.startTime).format("DD/MM/YYYY"),
            startTime: moment(data.startTime).format("HH:mm"),
            endTime: moment(data.endTime).format("HH:mm"),
          },
        ],
      };

      // addServiceToCartPayload.quantity = data?.quantity;
      // addServiceToCartPayload.productVariant = data?.productVariant;

      const { addServiceToCart } = await dispatch(
        AddServiceToCartAction(addServiceToCartPayload)
      );

      if (!addServiceToCart) {
        return notification.error({
          message: "Unable to add service to cart",
        });
      }

      const createBookingPayload = {
        ...genericPayload,
        status: "PENDING",
        times: [
          {
            date: moment(data.startTime).format("DD/MM/YYYY"),
            startTime: moment(data.startTime).format("HH:mm"),
            endTime: moment(data.endTime).format("HH:mm"),
          },
        ],
      };

      const { createBooking } = await dispatch(
        CreateBookingAction(createBookingPayload)
      );

      if (!createBooking) {
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
        return notification.error({
          message: "Unable to create booking",
        });
      }

      notification.success({
        message: "Booking created successfully",
      });

      return createOrder;
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

export function GetBookingsAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      return urqlQuery
        .query(GetBookings, {
          vendorId,
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

          dispatch(requestSuccessUpdateStateData(result.data.getBookings));
          return result.data;
        });
    } catch (error) {
      throw error;
    }
  };
}
