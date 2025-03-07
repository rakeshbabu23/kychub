import React from "react";
import { Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useProductCompare } from "../context/ProductCompareContext";
import useFetch from "../hooks/useFetch";
import { getHighlightedAttributes } from "../utils/helper";
import ProductTable from "../components/product/ProductTable";
import { config } from "../config/config";

const { Title } = Typography;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { compareProducts, addProductToCompare } = useProductCompare();
  const {
    data: products,
    loading,
    paginationInfo,
    goToPage,
    setLimit,
  } = useFetch(`${config.API_URL}/products`);

  const isProductInCompare = (productId) => {
    return compareProducts.some((product) => product.id === productId);
  };

  const handleCompare = (product) => {
    const added = addProductToCompare(product);
    if (added) {
      navigate("/compare");
    }
  };

  const highlightedAttributes = getHighlightedAttributes();

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: "24px" }}>
        Product Details
      </Title>

      <Card
        bordered={false}
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <ProductTable
          products={products}
          loading={loading}
          paginationInfo={paginationInfo}
          onPageChange={goToPage}
          onLimitChange={setLimit}
          highlightedAttributes={highlightedAttributes}
          isProductInCompare={isProductInCompare}
          onCompare={handleCompare}
        />
      </Card>
    </div>
  );
};

export default ProductDetails;
