import {
  MailOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import {
  cartProductTableColumns,
  cartServiceTableColumns,
  cartWorkshopTableColumns,
} from "./OrderDetailsList.utils";

const OrderDetails = ({ selectedOrder }: any) => {
  return (
    <div className="rounded-md bg-graybg p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-xl font-bold">
          Order Number{" "}
          <span className="text-xl text-green">#{selectedOrder?.orderId}</span>
        </p>

        <div className="flex items-center">
          <Button
            className="mx-4"
            type="primary"
            icon={<ShareAltOutlined />}
            size="middle"
          >
            Share Order
          </Button>

          <Button type="primary" icon={<WhatsAppOutlined />} size="middle">
            Message Customer
          </Button>
        </div>
      </div>

      <div className="mt-10 flex w-full items-baseline">
        <div className="mr-5 w-9/12">
          <div className="rounded-md bg-white p-5">
            <p className="text-xl">Cart Summary</p>

            <Table
              columns={cartProductTableColumns}
              // dataSource={data}
              // loading={loading}
            />

            <Table
              columns={cartServiceTableColumns}
              // dataSource={data}
              // loading={loading}
            />

            <Table
              columns={cartWorkshopTableColumns}
              // dataSource={data}
              // loading={loading}
            />
          </div>
        </div>

        <div className="w-1/4">
          <div className="rounded-md bg-white p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xl">Status</p>
              <Tag color="processing">pending</Tag>
            </div>
            <p className="text-base">Would you like to confirm this order?</p>
            <div>
              <Button type="primary" className="mr-5">
                Confirm
              </Button>
              <Button type="primary" danger>
                Reject
              </Button>
            </div>
          </div>

          <div className="mt-5 rounded-md bg-white p-5">
            <div className="flex flex-col items-baseline justify-between">
              <p className="text-xl">Customer</p>

              <div className="flex w-full items-center justify-between">
                <div className="flex items-baseline">
                  <UserOutlined /> <p className="ml-2">Customer Name</p>
                </div>

                <p>{selectedOrder?.customer}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-baseline">
                  <PhoneOutlined /> <p className="ml-2">Phone Number</p>
                </div>

                <p>{selectedOrder?.customerInfo?.phone}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-baseline">
                  <MailOutlined /> <p className="ml-2">Email Address</p>
                </div>

                <p>sara@anyaa.io</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-md bg-white p-5">
            <div className="flex flex-col items-baseline justify-between">
              <p className="text-xl">Summary</p>

              <div className="flex w-full items-center justify-between">
                <p>Order Created</p>
                <p>Sun, Dec 11, 2022</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p>Order Time</p>
                <p>05:35 PM</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p>Payment Method</p>
                <p>Visa</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p>Delivery Type</p>
                <p>SMSA</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p>Subtotal</p>
                <p>35000 SAR</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p>Delivery Fee</p>
                <p>25 SAR</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-base font-bold">Total</p>
                <p>35025 SAR (tax incl)</p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-md bg-white p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xl">Address</p>
            </div>

            <div>
              <p>
                <span className="font-bold">Address line:</span>7687 ibn katheer
                st.
              </p>
              <p>
                <span className="font-bold">City:</span> Khobar
              </p>
              <p className="text-green underline">Google maps location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
