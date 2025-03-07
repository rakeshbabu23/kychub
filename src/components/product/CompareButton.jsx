import React from 'react';
import { Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

const CompareButton = ({ isInCompare, onClick }) => {
  return (
    <Button
      type={isInCompare ? "default" : "primary"}
      icon={<SwapOutlined />}
      onClick={onClick}
      shape="round"
      size="small"
      style={{
        borderColor: isInCompare ? '#d9d9d9' : 'var(--primary-color)',
        color: isInCompare ? '#8c8c8c' : '#fff',
      }}
    >
      {isInCompare ? "Added" : "Compare"}
    </Button>
  );
};

export default CompareButton;
