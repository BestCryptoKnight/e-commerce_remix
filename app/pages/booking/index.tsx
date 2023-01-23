import { useEffect, useState } from "react";
import {
  GetBookingsAction,
} from "~/redux/app/actions/booking";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Checkbox, Row, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { BookingTableWrapper } from "./styles";
import BookingFilter from "~/components/shared/filter-columns";

export default function Index() {
  const [selectedAction, setSelectedAction] = useState("");
  const [filteredColumn, setFilteredColumn] = useState([]);

  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);
  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(GetBookingsAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetBookingsAction(page, pageSize));
  };

  const [tableColumns, setTableColumns] = useState<any>([
    {
      title: "Vendor ID",
      dataIndex: "vendorId",
      key: "vendorId",

      render: (_: any, record: any) => {
        return (
          <p>{record?.vendor ? record?.vendor?.id : ''}</p>
        );
      },
      label: <Checkbox value="vendorId">Vendor ID</Checkbox>,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",

      render: (_: any, record: any) => {
        return (
          <p>{record?.vendor ? record?.vendor?.name : ''}</p>
        );
      },
      label: <Checkbox value="vendorName">Vendor Name</Checkbox>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",

      render: (_: any, record: any) => {
        return (
          <p>{record?.orderId ? record?.orderId : ''}</p>
        );
      },
      label: <Checkbox value="orderId">Order ID</Checkbox>,
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      render: (_: any, record: any) => {
        return (
          <p>
            {record?.product
              ? record?.product?.title
              : ""}
          </p>
        );
      },
      label: <Checkbox value="serviceName">Service Name</Checkbox>,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",

      render: (_: any, record: any) => {
        return (
          <p>{record?.product ? record?.product?.type : ''}</p>
        );
      },
      label: <Checkbox value="serviceType">Service Type</Checkbox>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => {
        return (
          <p>{record?.createdAt ? record?.createdAt : ''}</p>
        );
      },
      label: <Checkbox value="createdAt">Created At</Checkbox>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (_: any, record: any) => {
        return (
          <p>{record?.slots ? record?.slots[0]?.from : ''}</p>
        );
      },
      label: <Checkbox value="startTime">Start Time</Checkbox>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (_: any, record: any) => {
        return (
          <p>{record?.slots ? record?.slots[0]?.to : ''}</p>
        );
      },
      label: <Checkbox value="endTime">End Time</Checkbox>,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (_: any, record: any) => {
        return (
          <p>{record?.createdAt ? record?.createdAt : ''}</p>
        );
      },
      label: <Checkbox value="bookingDate">Booking Date</Checkbox>,
    },
  ]);

  return (
    <BookingTableWrapper>
      <h2 className="text-3xl">Bookings</h2>
      <Row gutter={24} className="flex items-baseline justify-between mb-4">
        <BookingFilter
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          filteredColumn={filteredColumn}
          setFilteredColumn={setFilteredColumn}
        />
      </Row>

      <div className="flex flex-col items-end justify-center">
        <Table
          columns={filteredColumn.length > 0 ? filteredColumn : tableColumns}
          dataSource={list}
          loading={loading}
          size="middle"
          pagination={false}
        />

        <Pagination
          defaultCurrent={1}
          total={totalCount}
          style={{ padding: "40px 0" }}
          pageSize={10}
          showTotal={(total) => `Total ${total} items`}
          onChange={(current, pageSize) => getPaginatedItems(current, pageSize)}
        />
      </div>

    </BookingTableWrapper>
  );
}

