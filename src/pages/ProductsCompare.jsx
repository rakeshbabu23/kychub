import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Button,
  Modal,
  Table,
  Empty,
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Tag,
  Rate,
  Badge,
  Space,
  Avatar,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
  SwapOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import useFetch from "../hooks/useFetch";
import { useProductCompare } from "../context/ProductCompareContext";
import { config } from "../config/config";

const { Title, Text, Paragraph } = Typography;

const CompareProducts = () => {
  const { compareProducts, removeProductFromCompare, addProductToCompare } =
    useProductCompare();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: products,
    loading,
    paginationInfo,
    goToPage,
    setLimit,
  } = useFetch(`${config.API_URL}/products`);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddToCompare = (product) => {
    const added = addProductToCompare(product);
    if (added) {
      setIsModalOpen(false);
    }
  };

  const isProductInCompare = (productId) => {
    return compareProducts.some((product) => product.id === productId);
  };

  const getComparisonFeatures = () => {
    return [
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
            character={<StarFilled style={{ fontSize: "16px" }} />}
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
  };

  const columns = [
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

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
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
          onClick={() => navigate("/products")}
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
          onClick={showModal}
          disabled={compareProducts.length >= 4}
          size="large"
          shape="round"
          style={{ padding: "0 16px" }}
        >
          Add More
        </Button>
      </div>

      {compareProducts.length === 0 ? (
        <Card
          style={{
            textAlign: "center",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            padding: "40px 0",
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <Title level={4}>No products selected for comparison</Title>
                <Paragraph type="secondary">
                  Add products to compare their features and specifications
                </Paragraph>
              </div>
            }
          >
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate("/products")}
              shape="round"
              size="large"
            >
              Browse Products
            </Button>
          </Empty>
        </Card>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Product Cards Row */}
          <Row gutter={16} style={{ marginBottom: "32px" }}>
            {compareProducts.map((product) => (
              <Col span={24 / compareProducts.length} key={product.id}>
                <Card
                  cover={
                    <div
                      style={{
                        padding: "16px",
                        background: "#f9f9f9",
                        borderRadius: "16px 16px 0 0",
                      }}
                    >
                      <Image
                        src={product.thumbnail}
                        style={{
                          height: "180px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        preview={false}
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeProductFromCompare(product.id)}
                    >
                      Remove
                    </Button>,
                  ]}
                  style={{
                    textAlign: "center",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                  bodyStyle={{ padding: "16px" }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <Tag
                      color="blue"
                      style={{ borderRadius: "12px", margin: 0 }}
                    >
                      {product.category}
                    </Tag>
                  </div>

                  <Card.Meta
                    title={
                      <Title
                        level={4}
                        style={{ margin: "8px 0", fontSize: "18px" }}
                      >
                        {product.title}
                      </Title>
                    }
                    description={
                      <Space direction="vertical" size={4}>
                        <Text type="secondary">{product.brand}</Text>
                        <Text
                          strong
                          style={{ fontSize: "18px", color: "var(--primary-color)" }}
                        >
                          ${product.price}
                          {product.discountPercentage > 0 && (
                            <Text
                              delete
                              type="secondary"
                              style={{ fontSize: "14px", marginLeft: "8px" }}
                            >
                              $
                              {Math.round(
                                product.price /
                                  (1 - product.discountPercentage / 100)
                              )}
                            </Text>
                          )}
                        </Text>
                        <Rate
                          disabled
                          defaultValue={product.rating}
                          allowHalf
                          style={{ fontSize: "14px" }}
                        />
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Divider orientation="left">
            <Title level={4} style={{ margin: 0 }}>
              Detailed Comparison
            </Title>
          </Divider>

          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-column">Feature</th>
                  {compareProducts.map((product, index) => (
                    <th key={product.id} className="product-column">
                      {product.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getComparisonFeatures().map((feature, featureIndex) => (
                  <tr
                    key={feature.key}
                    className={featureIndex % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td className="feature-name">{feature.label}</td>
                    {compareProducts.map((product) => (
                      <td
                        key={`${product.id}-${feature.key}`}
                        className="feature-value"
                      >
                        {feature.formatter
                          ? feature.formatter(product[feature.key])
                          : product[feature.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        title={
          <div style={{ padding: "8px 0" }}>
            <Title level={4} style={{ margin: 0 }}>
              Add Products to Compare
            </Title>
            <Text type="secondary">
              You can select up to 4 products to compare
            </Text>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        bodyStyle={{ padding: "24px" }}
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        <Table
          dataSource={products.filter(
            (product) => !isProductInCompare(product.id)
          )}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: paginationInfo.currentPage,
            pageSize: paginationInfo.itemsPerPage,
            total: paginationInfo.totalItems,
            onChange: (page) => goToPage(page),
            onShowSizeChange: (_, size) => setLimit(size),
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
            showTotal: (total) => `Total ${total} products`,
          }}
          rowClassName={() => "product-row"}
          style={{ borderRadius: "8px", overflow: "hidden" }}
        />
      </Modal>

      <style>
        {`
          .product-row:hover {
            background-color: #f0f7ff;
          }
          
          .comparison-table-container {
            overflow-x: auto;
            border-radius: 8px;
            border: 1px solid #f0f0f0;
          }
          
          .comparison-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            table-layout: fixed;
          }
          
          .comparison-table th, 
          .comparison-table td {
            padding: 16px;
            border: 1px solid #f0f0f0;
            vertical-align: middle;
            word-wrap: break-word;
          }
          
          .comparison-table .feature-column {
            width: 150px;
            background-color: #fafafa;
            font-weight: bold;
          }
          
          .comparison-table .product-column {
            text-align: center;
            background-color: #f5f5f5;
            font-weight: 600;
          }
          
          .comparison-table .feature-name {
            background-color: #fafafa;
            font-weight: 500;
          }
          
          .comparison-table .feature-value {
            text-align: center;
          }
          
          .comparison-table .even-row {
            background-color: #fff;
          }
          
          .comparison-table .odd-row {
            background-color: #fafcff;
          }
          
         
          
          .ant-modal-content, 
          .ant-modal-header {
            border-radius: 16px 16px 0 0;
          }
          
          .ant-btn-round.ant-btn-lg {
            height: 40px;
            font-size: 16px;
          }
          
          .ant-empty-normal {
            margin: 32px 0;
          }
          
          .ant-card {
            transition: all 0.3s ease;
          }
          
          .ant-tag {
            border: none;
          }
        `}
      </style>
    </div>
  );
};

export default CompareProducts;
