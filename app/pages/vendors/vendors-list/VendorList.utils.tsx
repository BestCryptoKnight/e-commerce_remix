import { Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import moment from "moment";

export const vendorColumns = (
  searchText: any,
  searchInput: any,
  searchedColumn: any,
  setSearchText: any,
  setSearchedColumn: any,
  filterVendors: any
) => {
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    filterVendors({ [dataIndex]: selectedKeys[0] });
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  interface DataType {
    key: string;
    name: string;
    name_ar: string;
    slug: string;
    createdAt: string;
  }

  type DataIndex = keyof DataType;

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  return [
    {
      title: "Vendor Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => {
        return <p>{record?.name ? record?.name : ""}</p>;
      },
      label: <Checkbox value="name">Vendor Name</Checkbox>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Arabic Name",
      dataIndex: "name_ar",
      key: "name_ar",
      render: (_: any, record: any) => {
        return <p>{record?.name_ar ? record?.name_ar : ""}</p>;
      },
      label: <Checkbox value="name_ar">Arabic Name</Checkbox>,
      ...getColumnSearchProps("name_ar"),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (_: any, record: any) => {
        return <p>{record?.slug ? record?.slug : ""}</p>;
      },
      label: <Checkbox value="slug">Slug</Checkbox>,
      ...getColumnSearchProps("slug"),
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
      ...getColumnSearchProps("createdAt"),
    },
  ];
};
