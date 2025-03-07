import React from 'react';
import { Space, Typography, Badge } from 'antd';

const { Text } = Typography;

const ProductPrice = ({ price, discountPercentage = 0, highlightedAttributes = [] }) => {
  return (
    <Space direction="vertical" size={0}>
      <Text
        strong
        className={
          highlightedAttributes.includes("price")
            ? "highlighted-attribute"
            : ""
        }
        style={{ fontSize: "16px" }}
      >
        ${price}
      </Text>
      {discountPercentage > 0 && (
        <Badge
          count={`-${discountPercentage}%`}
          style={{
            backgroundColor: "#52c41a",
            fontWeight: highlightedAttributes.includes("discountPercentage")
              ? 600
              : 400,
          }}
        />
      )}
    </Space>
  );
};

export default ProductPrice;
