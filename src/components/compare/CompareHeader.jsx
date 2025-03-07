import React from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CompareHeader = ({ onBack, onAddProduct, disableAdd }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
      }}
    >
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        size="large"
        shape="round"
        style={{ padding: "0 16px" }}
      >
        Back to Products
      </Button>
      <Title level={2} style={{ margin: 0 }}>
        Compare Products
      </Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onAddProduct}
        disabled={disableAdd}
        size="large"
        shape="round"
      >
        Add Product
      </Button>
    </div>
  );
};

export default CompareHeader;
