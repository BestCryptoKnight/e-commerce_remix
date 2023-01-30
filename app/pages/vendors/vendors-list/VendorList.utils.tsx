import { Checkbox } from "antd";
export const vendorColumns = [
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
    key: "vendorName",
    render: (_: any, record: any) => {
      return <p>{record?.vendorName ? record?.vendorName : ""}</p>;
    },
    label: <Checkbox value="vendorName">Vendor Name</Checkbox>,
  },
  {
    title: "Vendor URL",
    dataIndex: "vendorUrl",
    key: "vendorUrl",
    render: (_: any, record: any) => {
      return <p>{record?.vendorUrl ? record?.vendorUrl : ""}</p>;
    },
    label: <Checkbox value="vendorUrl">Vendor URL</Checkbox>,
  },
  {
    title: "Products",
    dataIndex: "numberProducts",
    key: "numberProducts",

    render: (_: any, record: any) => {
      return <p>{record?.numberProducts ? record?.numberProducts : 0}</p>;
    },
    label: <Checkbox value="numberProducts">Number of Products</Checkbox>,
  },
  {
    title: "Orders",
    dataIndex: "number_orders",
    key: "number_orders",

    render: (_: any, record: any) => {
      return <p>{record?.numberOrders ? record?.numberOrders : 0}</p>;
    },
    label: <Checkbox value="number_orders">Number of Orders</Checkbox>,
  },
  {
    title: "Services",
    dataIndex: "number_services",
    key: "number_services",

    render: (_: any, record: any) => {
      return <p>{record?.numberServices ? record?.numberServices : 0}</p>;
    },
    label: <Checkbox value="number_services">Number of Services</Checkbox>,
  },
  {
    title: "Bookings",
    dataIndex: "number_bookings",
    key: "number_bookings",

    render: (_: any, record: any) => {
      return <p>{record?.numberBookings ? record?.numberBookings : 0}</p>;
    },
    label: <Checkbox value="number_bookings">Number of Bookings</Checkbox>,
  },
  {
    title: "Categories",
    dataIndex: "number_categories",
    key: "number_categories",

    render: (_: any, record: any) => {
      return <p>{record?.numberCategories ? record?.numberCategories : 0}</p>;
    },
    label: <Checkbox value="number_categories">Number of Categories</Checkbox>,
  },
  {
    title: "Coupons",
    dataIndex: "number_coupons",
    key: "number_coupons",

    render: (_: any, record: any) => {
      return <p>{record?.numberCoupons ? record?.numberCoupons : 0}</p>;
    },
    label: <Checkbox value="number_coupons">Number of Coupons</Checkbox>,
  },
  {
    title: "Account Manager",
    dataIndex: "account_manager",
    key: "account_manager",

    render: (_: any, record: any) => {
      return <p>{record?.accountManager ? record?.accountManager : "NAN"}</p>;
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
];
