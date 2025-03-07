import React from 'react';
import { Modal, Table, Space, Avatar, Typography, Tag, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useProductCompare } from '../../context/ProductCompareContext';
import '../../styles/product.css';

const { Text } = Typography;

const AddProductModal = ({ 
  isOpen, 
  onCancel, 
  products, 
  loading, 
  paginationInfo,
  onPageChange,
  onLimitChange,
  isProductInCompare,
  onAddToCompare,
  maxProducts
}) => {
  const { getHighlightedAttributes } = useProductCompare();

  const columns = [
    {
      title: "Product",
      dataIndex: "thumbnail",
      key: "product",
      width: 280,
      render: (thumbnail, record) => {
        const highlightedAttributes = getHighlightedAttributes(record.id);
        return (
          <Space size="middle">
            <Avatar shape="square" size={64} src={thumbnail} />
            <div>
              <Text 
                strong
                className={highlightedAttributes.includes("title") ? "highlighted-attribute" : ""}
              >
                {record.title}
              </Text>
              <div>
                <Text 
                  type="secondary" 
                  style={{ fontSize: "12px" }}
                  className={highlightedAttributes.includes("brand") ? "highlighted-attribute" : ""}
                >
                  {record.brand}
                </Text>
              </div>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => {
        const highlightedAttributes = getHighlightedAttributes(record.id);
        return (
          <Tag 
            color={highlightedAttributes.includes("category") ? "primary" : "default"}
            style={{ 
              borderRadius: "12px", 
              padding: "2px 8px",
              fontWeight: highlightedAttributes.includes("category") ? 600 : 400,
            }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, record) => {
        const highlightedAttributes = getHighlightedAttributes(record.id);
        return (
          <Space direction="vertical" size={0}>
            <Text 
              strong 
              className={highlightedAttributes.includes("price") ? "highlighted-attribute" : ""}
              style={{ fontSize: "14px" }}
            >
              ${price}
            </Text>
            {record.discountPercentage > 0 && (
              <Tag 
                color={highlightedAttributes.includes("discountPercentage") ? "primary" : "success"}
                style={{ 
                  fontSize: "10px", 
                  margin: 0,
                  fontWeight: highlightedAttributes.includes("discountPercentage") ? 600 : 400,
                }}
              >
                {record.discountPercentage}% OFF
              </Tag>
            )}
          </Space>
        );
      },
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
            onClick={() => !isInCompare && onAddToCompare(record)}
            disabled={isInCompare || maxProducts}
            shape="round"
            size="small"
          >
            {isInCompare ? "Added" : "Compare"}
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Add Product to Compare"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey="id"
        pagination={{
          current: paginationInfo.currentPage,
          pageSize: paginationInfo.itemsPerPage,
          total: paginationInfo.totalItems,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
          onChange: onPageChange,
          onShowSizeChange: (_, size) => onLimitChange(size),
          showTotal: (total) => `Total ${total} products`,
        }}
      />
    </Modal>
  );
};

export default AddProductModal;
