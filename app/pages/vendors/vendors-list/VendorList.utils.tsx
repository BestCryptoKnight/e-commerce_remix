import { Checkbox } from "antd";
import moment from "moment";
import { getColumnSearchProps } from "~/components/shared/table-search/TableSearch";

export const vendorColumns = (
  searchText: any,
  searchInput: any,
  searchedColumn: any,
  setSearchText: any,
  setSearchedColumn: any,
  filterVendors: any
) => {
  return [
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => {
        return <p>{record?.name ? record?.name : ""}</p>;
      },
      label: <Checkbox value="name">Vendor Name</Checkbox>,
      ...getColumnSearchProps(
        "name",
        searchText,
        searchInput,
        searchedColumn,
        setSearchText,
        setSearchedColumn,
        filterVendors
      ),
    },
    {
      title: "Arabic Name",
      dataIndex: "name_ar",
      key: "name_ar",
      render: (_: any, record: any) => {
        return <p>{record?.name_ar ? record?.name_ar : ""}</p>;
      },
      label: <Checkbox value="name_ar">Arabic Name</Checkbox>,
      ...getColumnSearchProps(
        "name_ar",
        searchText,
        searchInput,
        searchedColumn,
        setSearchText,
        setSearchedColumn,
        filterVendors
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (_: any, record: any) => {
        return <p>{record?.slug ? record?.slug : ""}</p>;
      },
      label: <Checkbox value="slug">Slug</Checkbox>,
      ...getColumnSearchProps(
        "slug",
        searchText,
        searchInput,
        searchedColumn,
        setSearchText,
        setSearchedColumn,
        filterVendors
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any) => {
        return (
          <p>
            {record?.createdAt
              ? moment(record?.createdAt).format("DD-MM-YYYY HH:mm a")
              : ""}
          </p>
        );
      },
      label: <Checkbox value="createdAt">createdAt</Checkbox>,
      ...getColumnSearchProps(
        "createdAt",
        searchText,
        searchInput,
        searchedColumn,
        setSearchText,
        setSearchedColumn,
        filterVendors
      ),
    },
  ];
};
