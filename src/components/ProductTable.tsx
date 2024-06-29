import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TProduct, TProductTableProps } from "../types";
import type { TablePaginationConfig } from "antd/lib/table";
import { Link } from "react-router-dom";
type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: TableColumnsType<TProduct> = [
  {
    title: "ID",
    dataIndex: "id",
  },

  {
    title: "THUMBNAIL",
    dataIndex: "thumbnail",
    key: "imageUrl",
    render: (text: string) => (
      <img
        className="bg-gray-50"
        src={text}
        alt="Product"
        style={{ width: 80, height: 80 }}
      />
    ),
  },

  {
    title: "TITLE",
    dataIndex: "title",
  },
  {
    title: "BRAND",
    dataIndex: "brand",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
  },
  {
    title: "PRICE",
    dataIndex: "price",
  },
  {
    title: "STOCK",
    dataIndex: "stock",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: TProduct) => (
      <div className="space-x-3">
        <Link to={`/product-details/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
        <Link to={`/edit-product/${record.id}`}>
          <Button type="primary">Edit Product</Button>
        </Link>
      </div>
    ),
  },
];

export default function ProductTable({ products }: TProductTableProps) {
  const data = products;
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    pageSizeOptions: ["5", "10", "20", "30", "40"],
    showSizeChanger: true,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    setPagination(pagination);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<TProduct> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={handleTableChange}
    />
  );
}
