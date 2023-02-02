import { useEffect, useState } from "react";
import { GetBookingsAction } from "~/redux/app/actions/booking";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Row } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { BookingTableWrapper } from "./styles";
import BookingFilter from "~/components/shared/filter-columns";
import { bookingColumns } from "./booking.utils";

export default function Index() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(StateData);
  const { list, totalCount } = data;
  const loading = useAppSelector(StateLoading);

  const [filteredColumn, setFilteredColumn] = useState(bookingColumns);

  useEffect(() => {
    //save current page and pagesize in store and pass it here
    dispatch(GetBookingsAction(1, 10));
  }, [dispatch]);

  const getPaginatedItems = (page: number, pageSize: number) => {
    dispatch(GetBookingsAction(page, pageSize));
  };

  const [tableColumns, setTableColumns] = useState<any>();

  return (
    <BookingTableWrapper>
      <h2 className="text-3xl">Bookings # {totalCount}</h2>
      <Row gutter={24} className="mb-4 flex items-baseline justify-between">
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
          pagination={{
            defaultCurrent: 1,
            total: totalCount,
            pageSize: 10,
            showTotal(total) {
              return <p>Total {total} items</p>;
            },
            onChange: (current, pageSize) =>
              getPaginatedItems(current, pageSize),
          }}
        />
      </div>
    </BookingTableWrapper>
  );
}
