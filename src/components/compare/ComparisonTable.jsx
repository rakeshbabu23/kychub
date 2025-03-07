import React from 'react';
import { Table, Typography, Rate, Badge, Empty, Button, Tag } from 'antd';
import { DeleteOutlined, StarFilled } from '@ant-design/icons';
import { useProductCompare } from '../../context/ProductCompareContext';
import '../../styles/product.css';

const { Text } = Typography;

const ComparisonTable = ({ products, onRemoveProduct }) => {
  const { highlightedAttributes } = useProductCompare();

  if (!products.length) {
    return (
      <Empty
        description="No products to compare"
        style={{ margin: "48px 0" }}
      />
    );
  }

  const features = [
    { key: "title", label: "Product Name" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", formatter: (val) => `$${val}` },
    {
      key: "discountPercentage",
      label: "Discount",
      formatter: (val) => `${val}%`,
    },
    {
      key: "rating",
      label: "Rating",
      formatter: (val) => (
        <Rate
          disabled
          defaultValue={val}
          allowHalf
          character={<StarFilled style={{ fontSize: "16px", color: "var(--primary-color)" }} />}
        />
      ),
    },
    {
      key: "stock",
      label: "Stock",
      formatter: (val) => (
        <Badge
          status={val > 50 ? "success" : val > 10 ? "warning" : "error"}
          text={
            val > 50 ? "In Stock" : val > 10 ? "Low Stock" : "Very Low Stock"
          }
        />
      ),
    },
    { key: "description", label: "Description" },
  ];

  const columns = [
    {
      title: "Features",
      dataIndex: "feature",
      key: "feature",
      width: 150,
      fixed: "left",
      render: (text) => <Text strong>{text}</Text>,
    },
    ...products.map((product, index) => ({
      title: (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              marginBottom: "12px",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemoveProduct(product.id)}
              style={{
                position: "absolute",
                top: "-12px",
                right: "-12px",
                borderRadius: "50%",
                minWidth: "auto",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <Text 
            strong 
            className={highlightedAttributes.includes("title") ? "highlighted-attribute" : ""}
            style={{ display: "block", marginBottom: "4px" }}
          >
            {product.title}
          </Text>
        </div>
      ),
      dataIndex: `product${index}`,
      key: `product${index}`,
      align: "center",
      width: 200,
      render: (value, record) => {
        const featureKey = record.key;
        const isHighlighted = highlightedAttributes.includes(featureKey);
        
        if (record.feature === "Rating") {
          return value;
        }

        if (record.feature === "Stock") {
          return (
            <div className={isHighlighted ? "highlighted-attribute" : ""}>
              {value}
            </div>
          );
        }

        if (record.feature === "Category") {
          return (
            <Tag 
              color={isHighlighted ? "primary" : "default"}
              style={{ 
                borderRadius: "12px", 
                padding: "2px 8px",
                fontWeight: isHighlighted ? 600 : 400,
              }}
            >
              {value}
            </Tag>
          );
        }

        return (
          <Text className={isHighlighted ? "highlighted-attribute" : ""}>
            {value}
          </Text>
        );
      },
    })),
  ];

  const data = features.map((feature) => ({
    key: feature.key,
    feature: feature.label,
    ...products.reduce((acc, product, index) => {
      acc[`product${index}`] = feature.formatter
        ? feature.formatter(product[feature.key])
        : product[feature.key];
      return acc;
    }, {}),
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: "max-content" }}
      bordered
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default ComparisonTable;
