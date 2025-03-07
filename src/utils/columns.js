import React from "react";
import { Space, Avatar, Typography, Tag, Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import {
  isProductInCompare,
  handleAddToCompare,
  compareProducts,
} from "./compareUtils";

const { Text } = Typography;

export const columns = [
  {
    title: "Product",
    dataIndex: "thumbnail",
    key: "product",
    width: 280,
    render: (thumbnail, record) => (
      <Space size="middle">
        <Avatar shape="square" size={64} src={thumbnail} />
        <div>
          <Text strong>{record.title}</Text>
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.brand}
            </Text>
          </div>
        </div>
      </Space>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => (
      <Tag color="blue" style={{ borderRadius: "12px", padding: "2px 8px" }}>
        {text}
      </Tag>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price, record) => (
      <Space direction="vertical" size={0}>
        <Text strong style={{ fontSize: "14px" }}>
          ${price}
        </Text>
        {record.discountPercentage > 0 && (
          <Tag color="green" style={{ fontSize: "10px", margin: 0 }}>
            {record.discountPercentage}% OFF
          </Tag>
        )}
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      const isInCompare = isProductInCompare(record.id);
      return (
        <Button
          type={isInCompare ? "default" : "primary"}
          icon={<SwapOutlined />}
          onClick={() => !isInCompare && handleAddToCompare(record)}
          disabled={isInCompare || compareProducts.length >= 4}
          shape="round"
          size="small"
        >
          {isInCompare ? "Added" : "Compare"}
        </Button>
      );
    },
  },
];
