import { useEffect, useState } from "react";
import { GetVendorViewAction } from "~/redux/app/actions/vendor_view";
import { useAppDispatch, useAppSelector } from "~/hooks/Store";
import { Table, Checkbox, Row, Pagination } from "antd";
import { data as StateData, loading as StateLoading } from "~/redux/app";
import { VendorTableWrapper } from "../styles";
import ProductFilter from "~/components/shared/filter-columns";

export default function Index() {

    const [filteredColumn, setFilteredColumn] = useState([]);

    const dispatch = useAppDispatch();
    const data = useAppSelector(StateData);
    console.log("table data", data)
    const { list, totalCount } = data;
    const loading = useAppSelector(StateLoading);
    useEffect(() => {
        //save current page and pagesize in store and pass it here
        dispatch(GetVendorViewAction(1, 10));
    }, [dispatch]);

    const getPaginatedItems = (page: number, pageSize: number) => {
        dispatch(GetVendorViewAction(page, pageSize));
    };

    const [tableColumns, setTableColumns] = useState<any>([
        // {
        //     title: "Last Login",
        //     dataIndex: "last_login",
        //     key: "last_login",
        //     render: (_: any, record: any) => {
        //         return (
        //             <p>{record?.title ? record?.title : record?.variants[0]?.title}</p>
        //         );
        //     },
        //     label: <Checkbox value="last_login">Last Login</Checkbox>,
        // },
        {
            title: "Products",
            dataIndex: "numberProducts",
            key: "numberProducts",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberProducts ? record?.numberProducts : 0}</p>
                );
            },
            label: <Checkbox value="numberProducts">Number of Products</Checkbox>,
        },
        {
            title: "Orders",
            dataIndex: "number_orders",
            key: "number_orders",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberOrders ? record?.numberOrders : 0}</p>
                );
            },
            label: <Checkbox value="number_orders">Number of Orders</Checkbox>,
        },
        {
            title: "Services",
            dataIndex: "number_services",
            key: "number_services",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberServices ? record?.numberServices : 0}</p>
                );
            },
            label: <Checkbox value="number_services">Number of Services</Checkbox>,
        },
        {
            title: "Bookings",
            dataIndex: "number_bookings",
            key: "number_bookings",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberBookings ? record?.numberBookings : 0}</p>
                );
            },
            label: <Checkbox value="number_bookings">Number of Bookings</Checkbox>,
        },
        {
            title: "Categories",
            dataIndex: "number_categories",
            key: "number_categories",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberCategories ? record?.numberCategories : 0}</p>
                );
            },
            label: <Checkbox value="number_categories">Number of Categories</Checkbox>,
        },
        {
            title: "Coupons",
            dataIndex: "number_coupons",
            key: "number_coupons",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.numberCoupons ? record?.numberCoupons : 0}</p>
                );
            },
            label: <Checkbox value="number_coupons">Number of Coupons</Checkbox>,
        },
        {
            title: "Account Manager",
            dataIndex: "account_manager",
            key: "account_manager",

            render: (_: any, record: any) => {
                return (
                    <p>{record?.accountManager ? record?.accountManager : "NAN"}</p>
                );
            },
            label: <Checkbox value="account_manager">Account Manager</Checkbox>,
        },
        // {
        //     title: "Notes",
        //     dataIndex: "notes",
        //     key: "notes",
        //     render: (_: any, record: any) => {
        //         return (
        //             <p>
        //                 {record?.title_ar
        //                     ? record?.title_ar
        //                     : record?.variants[0]?.title_ar}
        //             </p>
        //         );
        //     },
        //     label: <Checkbox value="notes">Notes</Checkbox>,
        // },
        // {
        //     title: "Activity",
        //     dataIndex: "last_activity",
        //     key: "last_activity",
        //     render: (_: any, record: any) => {
        //         return (
        //             <p>
        //                 {record?.title_ar
        //                     ? record?.title_ar
        //                     : record?.variants[0]?.title_ar}
        //             </p>
        //         );
        //     },
        //     label: <Checkbox value="last_activity">Last Activity</Checkbox>,
        // },
        // {
        //     title: "Revenue",
        //     dataIndex: "revenue",
        //     key: "revenue",
        //     render: (_: any, record: any) => {
        //         return (
        //             <p>
        //                 {record?.title_ar
        //                     ? record?.title_ar
        //                     : record?.variants[0]?.title_ar}
        //             </p>
        //         );
        //     },
        //     label: <Checkbox value="revenue">Revenue</Checkbox>,
        // },
        // {
        //     title: "Gateway",
        //     dataIndex: "payment_gateway_active",
        //     key: "payment_gateway_active",
        //     render: (_: any, record: any) => {
        //         return (
        //             <p>
        //                 {record?.title_ar
        //                     ? record?.title_ar
        //                     : record?.variants[0]?.title_ar}
        //             </p>
        //         );
        //     },
        //     label: <Checkbox value="payment_gateway_active">Payment Gateway Active</Checkbox>,
        // },
        // {
        //     title: "Document",
        //     dataIndex: "document_upload",
        //     key: "document_upload",
        //     render: (_: any, record: any) => {
        //         return (
        //             <div dangerouslySetInnerHTML={{ __html: record?.description }} />
        //         );
        //     },
        //     label: <Checkbox value="document_upload">Document Upload</Checkbox>,
        // },
        // {
        //     title: "Active",
        //     dataIndex: "active",
        //     key: "active",
        //     render: (_: any, record: any) => {
        //         return (
        //             <div dangerouslySetInnerHTML={{ __html: record?.description }} />
        //         );
        //     },
        //     label: <Checkbox value="active">Active</Checkbox>,
        // },
        // {
        //     title: "Subscriber",
        //     dataIndex: "subscriber",
        //     key: "subscriber",
        //     render: (_: any, record: any) => {
        //         return (
        //             <div dangerouslySetInnerHTML={{ __html: record?.description }} />
        //         );
        //     },
        //     label: <Checkbox value="subscriber">Subscriber</Checkbox>,
        // },
        // {
        //     title: "Type",
        //     dataIndex: "type_subscription",
        //     key: "type_subscription",
        //     render: (_: any, record: any) => {
        //         return (
        //             <div dangerouslySetInnerHTML={{ __html: record?.description_ar }} />
        //         );
        //     },
        //     label: <Checkbox value="type_subscription">Type of Subscription</Checkbox>,
        // },

    ]);

    return (
        <VendorTableWrapper>
            <h2 className="text-3xl">Vendors</h2>
            <Row gutter={24} className="flex items-baseline justify-between">
                <ProductFilter
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
        </VendorTableWrapper>
    );
}
