import { Checkbox } from "antd";
import moment from "moment";
import ActiveIcon from "~/assets/icons/Active";
import ImageIcon from "~/assets/icons/ImageIcon";
import NonActive from "~/assets/icons/NonActive";
import { getColumnSearchProps } from "~/components/shared/table-search/TableSearch";

export const productColumns = (
  searchText: any,
  searchInput: any,
  searchedColumn: any,
  setSearchText: any,
  setSearchedColumn: any,
  filterVendors: any
) => [
  {
    ...getColumnSearchProps(
      "vendorId",
      searchText,
      searchInput,
      searchedColumn,
      setSearchText,
      setSearchedColumn,
      filterVendors
    ),
    title: "Vendor ID",
    key: "vendorId",
    render: (_: any, record: any) => {
      console.log(record);
      return <p>{record?.vendor ? record?.vendor?.id : ""}</p>;
    },
    label: <Checkbox value="vendorId">Vendor ID</Checkbox>,
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorName",
    key: "vendorName",

    render: (_: any, record: any) => {
      return <p>{record?.vendor ? record?.vendor?.name : ""}</p>;
    },
    label: <Checkbox value="vendorName">Vendor Name</Checkbox>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (_: any, record: any) => {
      return (
        <>
          {record?.image ? (
            <img
              src={record.image}
              alt={record?.title ? record?.title : record?.variants[0]?.title}
              width={50}
              height={50}
              className="rounded-lg object-cover"
            />
          ) : (
            <ImageIcon />
          )}
        </>
      );
    },
    label: <Checkbox value="image">Image</Checkbox>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",

    render: (_: any, record: any) => {
      return (
        <p>
          {record?.title
            ? record?.title
            : record?.variants && record?.variants[0]?.title}
        </p>
      );
    },
    label: <Checkbox value="title">Title</Checkbox>,
  },

  {
    title: "Attendance Type",
    dataIndex: "attendanceType",
    key: "attendanceType",

    render: (_: any, record: any) => {
      return <p>{record?.attendanceType ? record?.attendanceType : ""}</p>;
    },
    label: <Checkbox value="attendanceType">attendanceType</Checkbox>,
  },
  {
    title: "Arabic Title",
    dataIndex: "title_ar",

    key: "title_ar",
    render: (_: any, record: any) => {
      return (
        <p>
          {record?.title_ar
            ? record?.title_ar
            : record?.variants && record?.variants[0]?.title_ar}
        </p>
      );
    },
    label: <Checkbox value="title_ar">Arabic Title</Checkbox>,
  },
  {
    title: "Active",
    dataIndex: "active",

    key: "active",
    render: (_: any, record: any) => {
      return record?.active ? <ActiveIcon /> : <NonActive />;
    },
    label: <Checkbox value="title_ar">Arabic Title</Checkbox>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (_: any, record: any) => {
      return <div dangerouslySetInnerHTML={{ __html: record?.description }} />;
    },
    label: <Checkbox value="description">English Description</Checkbox>,
  },
  {
    title: "Arabic Description",
    dataIndex: "description_ar",

    key: "description_ar",
    render: (_: any, record: any) => {
      return (
        <div dangerouslySetInnerHTML={{ __html: record?.description_ar }} />
      );
    },
    label: <Checkbox value="description_ar">Arabic Description</Checkbox>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",

    render: (_: any, record: any) => {
      return (
        <>
          {record?.variants
            ? record?.variants.map((variant: any, idx: number) => {
                return <p key={idx}>{variant?.title + ":" + variant?.price}</p>;
              })
            : record?.variants && record?.variants[0]?.title_ar}
        </>
        // <div variants />
      );
    },
    label: <Checkbox value="price">Arabic Description</Checkbox>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",

    render: (_: any, record: any) => {
      return (
        <p>
          {record?.createdAt
            ? moment(record?.createdAt).format("DD-MM-YYYY HH:MM a")
            : ""}
        </p>
      );
    },
    label: <Checkbox value="createdAt">Created At</Checkbox>,
  },
  // ...productColumns,
  // {
  //   title: "Actions",
  //   key: "actions",
  //   render: (_: any, record: any) => {
  //     return (
  //       <ActionButtonsWrapper>
  //         <EditIcon
  //           onClick={() => {
  //             setSelectedAction("edit-product");
  //             setSelectedProduct(record);
  //             setProductDrawerOpen(true);
  //           }}
  //         />

  //         <Popconfirm
  //           title="Are you sure to delete this product?"
  //           onConfirm={() => dispatch(DeleteProductAction(record.id))}
  //           onCancel={() => console.log("cancel")}
  //           okText="Yes"
  //           cancelText="No"
  //         >
  //           <div>
  //             <DeleteIcon />
  //           </div>
  //         </Popconfirm>
  //       </ActionButtonsWrapper>
  //     );
  //   },
  //   label: <Checkbox value="actions">Actions</Checkbox>,
  // },
];
