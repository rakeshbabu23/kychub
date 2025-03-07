import React from 'react';
import { Space, Image, Typography, Tag } from 'antd';

const { Text } = Typography;

const ProductCard = ({ product, highlightedAttributes = [] }) => {
  return (
    <Space size="middle">
      <Image
        src={product.thumbnail}
        width={80}
        height={80}
        style={{ objectFit: "cover", borderRadius: "8px" }}
        preview={false}
      />
      <div>
        <Text
          strong
          className={
            highlightedAttributes.includes("title")
              ? "highlighted-attribute"
              : ""
          }
        >
          {product.title}
          {highlightedAttributes.includes("title") && (
            <Tag color="primary" style={{ marginLeft: 8, borderRadius: "12px" }}>
              Compare
            </Tag>
          )}
        </Text>
        <div>
          <Text type="secondary" ellipsis={{ rows: 2 }} style={{ maxWidth: 180 }}>
            {product.description}
          </Text>
        </div>
      </div>
    </Space>
  );
};

export default ProductCard;
