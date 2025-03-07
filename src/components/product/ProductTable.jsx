import React from 'react';
import { Table, Tag, Typography } from 'antd';
import ProductCard from './ProductCard';
import ProductPrice from './ProductPrice';
import CompareButton from './CompareButton';
import { useProductCompare } from '../../context/ProductCompareContext';

const { Text } = Typography;

const ProductTable = ({ 
  products, 
  loading, 
  paginationInfo, 
  onPageChange, 
  onLimitChange,
  isProductInCompare,
  onCompare 
}) => {
  const { getHighlightedAttributes } = useProductCompare();

  const columns = [
    {
      title: "Product",
      dataIndex: "thumbnail",
      key: "product",
      width: 280,
      render: (_, record) => (
        <ProductCard 
          product={record} 
          highlightedAttributes={getHighlightedAttributes(record.id)}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text, record) => (
        <Tag
          color={getHighlightedAttributes(record.id).includes('category') ? "primary" : "default"}
          style={{
            borderRadius: "12px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: getHighlightedAttributes(record.id).includes('category') ? 600 : 400,
          }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 120,
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      render: (text, record) => (
        <Text
          className={getHighlightedAttributes(record.id).includes('brand') ? "highlighted-attribute" : ""}
          style={{ 
            fontSize: "14px",
            fontWeight: getHighlightedAttributes(record.id).includes('brand') ? 600 : 400,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => (
        <ProductPrice 
          price={record.price}
          discountPercentage={record.discountPercentage}
          highlightedAttributes={getHighlightedAttributes(record.id)}
        />
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      sorter: (a, b) => a.stock - b.stock,
      render: (text, record) => (
        <Text
          className={getHighlightedAttributes(record.id).includes('stock') ? "highlighted-attribute" : ""}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <CompareButton
          isInCompare={isProductInCompare(record.id)}
          onClick={() => onCompare(record)}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={{
        current: paginationInfo?.currentPage || 1,
        pageSize: paginationInfo?.itemsPerPage || 10,
        total: paginationInfo?.totalItems || 0,
        onChange: (page, pageSize) => {
          if (pageSize !== paginationInfo?.itemsPerPage) {
            onLimitChange(pageSize);
          } else {
            onPageChange(page);
          }
        },
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total) => `Total ${total} products`,
        position: ["bottomCenter"],
        style: { marginTop: 16 }
      }}
      style={{ 
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};

export default ProductTable;
